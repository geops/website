---
title: How to set up a Django to only allow CORS requests in DEBUG mode
summary: This post is about how to set up a Django project to only allow CORS
  requests in DEBUG mode, even if they require a login to the backend. In our
  case, this has been useful to test frontend customizations on the internal dev
  environment without having to start the backend locally.
author: Milan Oberkirch
cover: /images/blog/how-to-set-up-a-django-to-only-allow-cors-requests-in-debug-mode/cors_01.png
created: 2022-01-12
slug: cors-in-django-in-debug-mode
tags:
  - python
  - developers
published: true
---
This post is about how to set up a Django project to only allow CORS requests in DEBUG mode, even if they require a login to the backend. In our case, this has been useful to test frontend customizations on the internal dev environment without having to start the backend locally.

So we are talking about projects where CORS is not used in production, because backend and frontend are united behind the same domain via reverse proxy.

## What is CORS?

Without special HTTP headers, all modern browsers refuse to send data from a page to a server with a different domain. The mechanism to explicitly enable this is called "Cross Origin Resource Sharing", or CORS for short. With the default behavior of first blocking everything, phishing attacks are made more difficult because the form for entering sensitive data must be hosted at the same domain where the data is received.

Also with cookies, especially the session cookie, you have to be explicit about whether you want it to be valid across different domains.

## What to do.

We do not want to change this default behavior for publicly accessible instances. With the proposed configuration, the attack surface increases only minimally, but it is still undesirable for productive use.

Instead, we use the DEBUG flag to allow access from 127.0.0.1 and localhost. The assumption here is, of course, that DEBUG is only set for internal instances.

To set the CORS headers we use [django-cors-headers](https://github.com/adamchainz/django-cors-headers) (so it must be installed).

If there are no APIs in production that should support CORS, the configuration looks like this:

```python
if DEBUG:
    CSRF_COOKIE_SECURE = False
    CORS_REPLACE_HTTPS_REFERER = True
    CSRF_COOKIE_DOMAIN = None
    SESSION_COOKIE_SECURE = False
    SESSION_COOKIE_HTTPONLY = False
    CORS_ALLOW_CREDENTIALS = True
    SESSION_COOKIE_SAMESITE = "None"
    CSRF_COOKIE_SAMESITE = "None"
    CORS_ALLOWED_ORIGIN_REGEXES = [
        r"^null$",
        r"^http://localhost:[0-9]+$",
        r"^http://127\\.0\\.0\\.1:[0-9]+$",
        r"^https://localhost:[0-9]+$",
        r"^https://127\\.0\\.0\\.1:[0-9]+$",
    ]
    INSTALLED_APPS = ["corsheaders"]
    MIDDLEWARE = ["corsheaders.middleware.CorsMiddleware"]
else:
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    INSTALLED_APPS = []
    MIDDLEWARE = []
 
INSTALLED_APPS += [
    ...
]
 
MIDDLEWARE += [
    ...
]
```

With older Django versions (<=3) an additional [workaround](https://github.com/zvyn/django-samesite-none) is needed to actually set the SameSite cookie property to "None".

With public APIs with CORS support, the distinction between CORS and cookie settings still makes sense, but the INSTALLED_APPS and MIDDLEWARE could be merged again:

```python
if DEBUG:
    CSRF_COOKIE_SECURE = False
    CORS_REPLACE_HTTPS_REFERER = True
    CSRF_COOKIE_DOMAIN = None
    SESSION_COOKIE_SECURE = False
    SESSION_COOKIE_HTTPONLY = False
    CORS_ALLOW_CREDENTIALS = True
    SESSION_COOKIE_SAMESITE = "None"
    CSRF_COOKIE_SAMESITE = "None"
    CORS_ALLOWED_ORIGIN_REGEXES = [
        r"^null$",
        r"^http://localhost:[0-9]+$",
        r"^http://127\\.0\\.0\\.1:[0-9]+$",
        r"^https://localhost:[0-9]+$",
        r"^https://127\\.0\\.0\\.1:[0-9]+$",
    ]
else:
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    # just an example:
    CORS_ORIGIN_ALLOW_ALL = True
    CORS_URLS_REGEX = r'^/api/.*$'
 
INSTALLED_APPS += [
    "corsheaders",
    ...
]
 
MIDDLEWARE += [
    "corsheaders.middleware.CorsMiddleware"
    ...
]
```

Your milage may vary of cause, but I hope the examples above serve as a good entry point.

## Frontend configuration

In order to use the CORS functionality, the request has to be adapted in the frontend  as well (ideally with an environment variable as feature-flag).

Example for fetch:

```javascript
const fetchResponsePromise = fetch(resource, {"mode": "cors", "credentials": "include"})
```

or for graphql-request:

```javascript
const graphQLClient = new GraphQLClient(endpoint, {
  credentials: 'include',
  mode: 'cors',
})
```