---
title: Hinzufügen von Typ-Hinweisen zu vorhandenem Code in Python
summary: Der Python-Interpreter behandelt Typen auf dynamische und flexible
  Weise ohne Einschränkungen bezüglich des Objekttyps, dem eine Variable
  zugewiesen ist. Seit Python 3.5 haben Programmierer die Möglichkeit,
  Typ-Annotationen in ihren Code einzufügen. Wir zeigen, wie man das macht.
created: 2022-09-27
slug: pythontypisierung
published: true
---
This blog post is aimed at Python programmers who are interested in adding type
annotations to an existing code base.

The Python interpreter handles types in a dynamic and flexible way without
constraints on what type of object a variable is assigned to. Since Python 3.5 programmers have the option to add type annotations to their code along with tools like `mypy` to check that they are valid. With the [`typing_extensions`](https://pypi.org/project/typing-extensions/)
backports you can use static typing features of the latest Python release in
every supported Python version. 

Adding static typing to your code base makes it easier to read and more robust:
unintended use of annotated functions and variables is flagged by the type
checker immediately instead of failing at runtime.


Types in Python
---------------

In general a ["data type"](https://en.wikipedia.org/wiki/Data_type) (or simply
"type") describes a set of possible values and operations. The `bool` type for
example can have the values `True` or `False` and supports logical and numeric
operations.

Python is dynamically typed:

 * the `type` of an `object` is _always well defined_
 * a _variable_ can be assigned to _any_ `object`
 * a variable can be _reassigned_ to any object _at runtime_

For example:

```python
a = "Hello"  # a is assigned to a value of type `str`
a = 123  # a is assigned to a value of type `int`
a /= 2  # a is assigned to the value 61.5, which is a `float`
```

The opposite of a dynamically typed language would be a statically typed language where a variable can only point at an object of a declared type. This is by design!

But it can lead to runtime bugs when your assumptions about the type of a
variable are wrong.


Type hints
----------

Type hints tell other programmers and static type checkers which type you
expect for a variable, parameter, or return value.

> An _annotation_ that specifies the _expected type_ (...)
> Type hints are _optional and are not enforced_ by Python (...)

There are tools to check type annotations _statically_, meaning
_before runtime_. Start with the code that would impact most other code, especially code outside the current repository:

 - libraries: modules that are imported a lot (`utils.py`)
 - APIs: data structures that will be consumed by different processes (REST API)


Setup
-----

For older Python versions than the latest release use [`typing_extensions`](https://pypi.org/project/typing-extensions/)
as drop-in replacement for the `typing` module and

```python
from __future__ import annotations
```

to support the syntax used in the examples below.

Type hints only make sense when they are enforced. The default tool to check
them is [`mypy`](http://www.mypy-lang.org/).

First install `mypy`:

```bash
pip install mypy
```

I recommend starting with the following configuration either in your `setup.cfg`
or a separate `mypy.ini`:

```ini
[mypy]
ignore_missing_imports = True
install_types = on
non_interactive = on
files =
  <list of files to check>
  [<seperated by newline>]
```

If you are using [`pre-commit`](https://pre-commit.com/) in combination with
[`pip-tools`](https://pypi.org/project/pip-tools/) the following snippet might
also be useful to you (more about the setup can be found [here](https://geops.com/blog/werkzeuge-fur-schonere-python-projekte)):

```
- repo: local
  hooks:
    - id: mypy
      name: mypy
      entry: mypy
      language: python
      pass_filenames: false
      files: '.*\.py$'
```

Annotating library functions
----------------------------

As a user of a library I want to know what the input and output of the library
look like without reading the code. This often looks more obvious than it is:

```python
import sys


def cat(input_file=sys.stdin, output_file=sys.stdout, end=""):
    while line := input_file.readline():
        print(line, end=end, file=output_file)


class Screemer:
    def __init__(self, input_file=sys.stdin):
        self.input_file = input_file

    def readline(self):
        while line := self.input_file.readline():
            return line.upper()


if __name__ == "__main__":
    cat(Screemer())
```

`cat` takes a input file and an output file and writes the content of the input
file to the output file. `ScreemInput` is a wrapper for an input file that turns everything into upper case.

We could annotate `input_file` and `output_file` to as `io.StringIO` *BUT* `ScreemInput` works fine with `cat` despite not being a text file!
We could also annotate `io.TextIO | ScreemInput` but that would still brake
third party consumers of the library that implemented their own wrappers.
Annotating `Any` to make the error go away also is not the best solution.

This is: Instead of asking "_Is it a file?_" we should ask "_Can I run readline on it?_". This can be done using the `typing.Protocol` helper. Protocols define an interface for _the consumer_ of the interface:

 * the users of the library don't need to change anything
 * type checkers will tell users which parts of the protocol they miss, if any
 * with a `@runtime_checkable` decorator protocols can be used to check whether an
object implements all it's methods at runtime

With that in mind the code above can be annotated like this:

```python
import sys
from typing import Protocol, Any, runtime_checkable


class SupportsReadline(Protocol):
    def readline(self) -> str | None:
        ...  # <- the dots are part of the syntax!


class SupportsWrite(Protocol):
    def write(self, str_: str, /) -> Any | None:
        ...


def cat(
    input_file: SupportsReadline = sys.stdin,
    output_file: SupportsWrite = sys.stdout,
    end: str = "",
):
    while line := input_file.readline():
        print(line, end=end, file=output_file)


class Screemer:
    def __init__(self, input_file=sys.stdin):
        self.input_file = input_file

    def readline(self) -> str | None:
        while line := self.input_file.readline():
            return line.upper()
        return None


if __name__ == "__main__":
    cat(Screemer())
```

Note that the `Screemer` class does not need to know about the protocols,
the fact that it implements the needed `readline` method is enough for `mypy`
to know that it implements the protocol.


Annotating JSON-API output
--------------------------

Another common use-case where type annotations are very useful to prevent
unexpected behaviour is to specify how the output of a network API should be
structured.

There are some great tools to choose from:

* `dataclasses.dataclass`
* `Pydantic`
* `FastAPI`

I highly recommend doing the [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/)!

But suppose you have a highly _performance-critical_ task in a project that
_writes lots of JSON-Dumps_ into a redis cache for later _consumption by other
processes_. Then all of the options mentioned above are too slow and changing your existing codebase it not feasible.

The following table from the [orjson readme](https://github.com/ijl/orjson#dataclass)
shows that even dataclasses come with a performance penalty, especially when
using the `json` serializer form the standard library:

| Library    | dict (ms)   | dataclass (ms)   | vs. orjson   |
|------------|-------------|------------------|--------------|
| orjson     | 1.40        | 1.60             | 1            |
| rapidjson  | 3.64        | 68.48            | 42           |
| simplejson | 14.21       | 92.18            | 57           |
| json       | 13.28       | 94.90            | 59           |

<small>This measures serializing 555KiB of JSON</small>

Nothing beats serializing a plain `dict` into JSON in terms of performance. The
`typing` module has a tool to keep doing that while still adding type
annotations:

`typing.TypedDict` can be used to annotate dictionaries without any runtime cost.

What worked for me: add a separate `api_models` module with only and all type
definitions. That way they can be easily accessed for different interfaces to
the same data as well as the producers.

Another useful tool when writing a `TypedDict` is `typing.TypeAlias` to give
the contents intuitive names, for example:

```
import typing

THexColor: str


class SerializedLabel(typing.TypedDict):
    text_color: THexColor
    background_color: THexColor
    content: str
```

`typing.TypeAlias` is useful for

 1. documentation of what that thing represents
 2. marker which things are the same type by design
 3. preparation to further restrict the type in the future (e.g. using pydantic)


### A complete example with FastAPI

FastAPI can also use `typing.TypedDict` as input and response type, making it
trivial to add a REST-API to a project with existing type annotations for JSON
output:

```python
from typing import TYPE_CHECKING, Literal, TypedDict
from datetime import datetime, timezone
from dataclasses import dataclass

from fastapi import FastAPI
import pydantic

THexColor = str
TCoords = list[int]  # no tuple!

if not TYPE_CHECKING:
    TCoords = pydantic.conlist(int, min_items=2, max_items=2)
    THexColor = pydantic.constr(
        regex=r"^#[0-9a-f]{6}$", to_lower=True, strip_whitespace=True, max_length=7
    )


class SerializedVehicleDict(TypedDict):
    timestamp: datetime
    vehicle_number: int
    position: TCoords
    is_moving: bool
    is_active: bool


@dataclass
class Vehicle:
    vehicle_number: int
    x: int
    y: int
    color: THexColor
    state: Literal["driving", "standby", "off"] = "off"

    def serialize(self) -> SerializedVehicleDict:
        return {
            "timestamp": datetime.now(timezone.utc),
            "vehicle_number": self.vehicle_number,
            "position": [self.x, self.y],
            "is_moving": self.state == "driving",
            "is_active": self.state != "off",
        }


app = FastAPI()


@app.post("/vehicle", response_model=SerializedVehicleDict)
def vehicle(input_vehicle: Vehicle):
    return input_vehicle.serialize()
```

This code is complete and should run with

```
pip install fastapi pydantic
uvicorn <filename>:app
```

Now have a look at `http://localhost:8000/docs` and be amazed!

In case the data you want to return is already serialized as a string you can
opt to return it directly using a `fastapi.Response` and still profit from the
documentation by using the `response_model` keyword argument to the decorator.


Final thoughts
--------------

Some recommendations based on my experience so far:

* Try to avoid using complex types as annotations, use a `typing.Protocol` instead
* Use `typing.TypeAlias` even for simple types wherever they add meaning
* Use `typing.TypedDict` where you want to be framework agnostic
* Start by annotating code that is used by others
* Add `mypy` to your CI-Pipeline first, configure files to check as you go

