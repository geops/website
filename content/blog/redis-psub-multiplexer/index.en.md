---
title: Using Redis Subscriptions Efficiently in Python
summary: Inspired by the websockets broadcast feature we built a subscription
  multiplexer for redis subscriptions to subscribe to Redis channels and
  patterns once for all relevant clients.
author: Milan Oberkirch
cover: /images/blog/using-redis-subscriptions-efficiently-in-python/screenshot-from-2024-02-29-17-15-17.png
created: 2024-03-04
slug: redis-psub-multiplexer
tags:
  - python
  - developers
frontpageImage: /images/blog/using-redis-subscriptions-efficiently-in-python/screenshot-from-2024-02-29-17-15-17.png
published: false
---
In our [world wide public transport tracker](https://mobility.portal.geops.io/de/world.geops.transit) we deliver a lot of updates to a lot of clients simultaneously.

Each dot on the map represents a data source that is currently active:

![A wold map with about 500 colored dots.](/images/blog/using-redis-subscriptions-efficiently-in-python/screenshot-from-2024-02-29-17-15-17.png "Map of data sources for our public transport tracker")

When you zoom in you will see trains and then buses appear on the map. That means that every user sees a different set of vehicles moving.

So how do we filter the relevant information for each user before sending it to the client?

At this point all the pre-processing has happened and we have the data we need in Redis caches and being pushed to Redis channels.

Our first measure to improve performance is the way we organize the cache names.

Each GTFS feed is linked to its own hash map with the key consisting of

* an internal ID of the vehicle
* the generalization level of the vehicle trajectory (the closer you zoom in the more detail you see)
* the  hex-encoded bounding box of the vehicle trajectory

The first step is to push out the data already in the cache so the user doesn't look at an empty map for too long. That's fairly cheap and scales nicely, or as Redis puts it: [O(1)](https://redis.io/commands/hget/).

Scanning through the items in the hash map is also fast, since we only need to look at the key to see whether the value is relevant for the user's zoom level and map extent by comparing the generalization level and bounding box encoded in the name. This scales at O(n).

For the subscriptions we could do the same: subscribe to all the data sources that may be relevant for the client and only send those relevant to the user in question.

But subscribing to channels is expensive and even slows down the sender, or as Redis puts it:

* [O(N) where N is the number of patterns to subscribe to](https://redis.io/commands/psubscribe/) for the subscriber and
* [O(N+M) where N is the number of clients subscribed to the receiving channel and M is the total number of subscribed patterns (by any client)](https://redis.io/commands/publish/) for the publisher

This does not scale nicely and turned out to be quite expensive.

So apart from encoding data relevant for filtering in the channel name we need to decouple the amount of clients from the amount of Redis subscriptions. (Site note: subscribing to everything once in the server process is not efficient for the amount of data involved, that's what we did for smaller live maps.)

## One producer, many subscribers

Inspired by the description of the [websockets broadcast](https://websockets.readthedocs.io/en/stable/topics/broadcast.html) feature I built a subscription multiplexer for redis subscriptions. Meaning we subscribe to Redis once for all clients currently interested in a channel or channel pattern.

The main trick is to create one `asyncio.Future`  for each channel pattern. The patterns need to be broad enough to not end up with a 1:1 mapping to clients again, but since we have the data source (GTFS feed) as a prefix and know the extent of each data source we can just use that.

Actually the code dealing with the subscriptions can be completely domain agnostic and works for any scenario where a subset of clients subscribes to a subset of patterns.

To allow multiple clients to receive the same message from the same Redis subscription we maintain a mapping from channel patterns to `Future` instances which are awaited by all the clients interested in that pattern and call `set_result` on the `Future` for each message.

After that the `Future` is obsolete but the clients need to get the next message on the channel as well. For this we simply set a new `Future` as part of the result. To keep track of which patterns need new Redis subscriptions and which Redis subscriptions became obsolete we also add a set of client-IDs to the result.

The complete implementation that supports channel names as well as patterns looks like this, the only requirement is redis-py:

```python
import asyncio
from asyncio.tasks import Task
from collections import defaultdict
from contextlib import asynccontextmanager
from dataclasses import dataclass
from collections.abc import Awaitable, Collection
from logging import getLogger
from typing import NamedTuple
from collections.abc import AsyncGenerator

from redis.asyncio import ConnectionPool
from redis.asyncio.client import PubSub

logger = getLogger(__name__)


class RedisMessage(NamedTuple):
    channel: str
    data: str


@dataclass
class _PubSubSubscription:
    clients: set[int]
    future: _PubSubFuture


_PubSubFuture = asyncio.Future[tuple[_PubSubSubscription, RedisMessage]]


class PubSubSubscriber:
    """Wrapper around `aioredis.PubSub` to allow multiple concurrent subscribers
 
    This class should be instantiated once per server process and is used to
    subscribe to channels or patterns and yield async generators for each
    subscription.
 
    Each subscription is associated with a client (e.g. a WebSocket handler).
    One client can have one generator for all its channels or patterns (up to
    two, one for channels and one for patterns).
    """

    pubsub: PubSub
    sub_lock: asyncio.Lock
    psub_lock: asyncio.Lock
    main_task: Task[None] | None

    def run(self, connection_pool: ConnectionPool) -> Awaitable[None]:
        """Run callbacks for subscribed channels
 
        This is needed for the generators produced from `subscribe` to work and
        should be started once per server process.
        """
        self._setup(connection_pool)
        self.main_task = asyncio.create_task(self.pubsub.run(), name="PubSubWrapper")
        return self.main_task

    def _setup(self, connection_pool: ConnectionPool) -> None:
        assert asyncio.get_event_loop().is_running()

        self.subs: dict[str, _PubSubSubscription] = defaultdict(
            lambda: _PubSubSubscription(set(), asyncio.Future())
        )
        self.psubs: dict[str, _PubSubSubscription] = defaultdict(
            lambda: _PubSubSubscription(set(), asyncio.Future())
        )
        self.pubsub = PubSub(connection_pool=connection_pool)
        self.sub_lock = asyncio.Lock()
        self.psub_lock = asyncio.Lock()

    @asynccontextmanager
    async def subscribe(
        self,
        client: object,  # passing in the obj to make sure the id is fixed
        *,
        channels: Collection[str] | None = None,
        patterns: Collection[str] | None = None,
    ) -> AsyncGenerator[AsyncGenerator[RedisMessage, None], None]:
        """Subscribe to channels or patterns and yield an async generator"""

        if channels and patterns:
            raise ValueError("Can't subscribe to both channels and patterns")
        names = patterns or channels
        if not names:
            raise ValueError("No channels or patterns to subscribe to")

        if patterns:
            lock = self.psub_lock
            sub_func = self.pubsub.psubscribe
            unsub_func = self.pubsub.punsubscribe
            type_ = "pattern"
            mapping = self.psubs
        else:
            lock = self.sub_lock
            sub_func = self.pubsub.subscribe
            unsub_func = self.pubsub.unsubscribe
            type_ = "channel"
            mapping = self.subs

        key = id(client)
        try:
            waiters: set[_PubSubFuture] = set()
            for name in names:
                sc = mapping[name]
                waiters.add(sc.future)
                async with lock:
                    if not sc.clients:
                        logger.info("Subscribing to %s %r", type_, name)
                        await sub_func(**{name: self._publish})
                    sc.clients.add(key)
            yield self._generator(waiters)
        finally:
            for name in names:
                sc = mapping[name]
                sc.clients.remove(key)
                async with lock:
                    if not sc.clients:
                        logger.info("Unsubscribing from %s %r", type_, name)
                        await unsub_func(name)
                        sc.future.cancel()
                        del mapping[name]

    async def _generator(
        self, waiters: set[_PubSubFuture]
    ) -> AsyncGenerator[RedisMessage, None]:
        while True:
            done, waiters = await asyncio.wait(
                waiters,
                return_when=asyncio.FIRST_COMPLETED,
            )
            if done:
                sc, message = done.pop().result()
                waiters.add(sc.future)
                yield message

    async def _publish(self, message: dict[str, str]) -> None:
        sc = (
            self.psubs[message["pattern"]]
            if message["type"] == "pmessage"
            else self.subs[message["channel"]]
        )
        future, sc.future = sc.future, asyncio.Future()
        future.set_result((sc, RedisMessage(message["channel"], message["data"])))
```

A minimal example for using it:

```python
from websockets.server import serve

PUBSUB = PubSubSubscriber()


async def websocket_handler(websocket):
    async with PUBSUB.subscribe(
          websocket, channels=direct_subsriptions
    ) as generator:
        async for message in generator:
            await websocket.send(message.data)


async def listen(self, host, port):
    async with serve(
            websocket_handler,
            host=host,
            port=port,
        ):
            logger.info("Listening on %s:%s...", host, port)
            connection_pool = ...  # Async ConnectionPool from redis-py
            await PUBSUB.run(connection_pool)
```

If the minimal example is your exact use case, use the websockets broadcast feature instead! But if you need to do client-specific post-processing this is likely the most efficient way to get the messages out of Redis.