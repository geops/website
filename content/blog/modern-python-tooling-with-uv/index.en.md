---
title: Managing Python Dependencies with uv
summary: A quick look at how switching to uv improved our Python workflow,
  replacing tools like pip, pip-tools, and virtualenv with a faster, all-in-one
  solution—plus tips for migrating existing projects.
author: Milan Oberkirch
cover: /images/blog/managing-python-dependencies-with-uv/chatgpt-image-jul-11-2025-at-02_57_49-pm.png
created: 2025-07-11
slug: modern-python-tooling-with-uv
tags:
  - developers
published: true
---
Since my [last blog post about python tooling about 5 years ago](https://geops.com/de/blog/werkzeuge-fur-schonere-python-projekte) a few things changed. In addition to [adding type annotations](https://geops.com/en/blog/python-typing) we switched from `"black"` and `"flake8"` to `"ruff"` and are switching from `"pip"` and `"pip-tools"` to `"uv"`. Both tools from <https://astral.sh/> have proven to be very reliable.  In this blog post I will focus on uv, wich can be more than just a drop-in replacement.

### What is uv?

uv claims to be "a single tool to replace `pip`**, `pip-tools`, `pipx`, `poetry`, `pyenv`, `twine`, `virtualenv`,** and more" while being "10-100x faster than pip". Similar to ruff it can be used as a drop-in for the tools it replaces, which is what we started with when we ran into an issue where [pip-tools output was no longer reproducible](https://github.com/jazzband/pip-tools/issues/2131) for some projects. It is as easy as it sounds: `uv pip compile` instead of `pip-compile` and copy-pasting the right snippet from <https://docs.astral.sh/uv/guides/integration/pre-commit/> into the `.pre-commit-config.yaml` .

After [Armin Ronachers talk on the prececessor of uv at the EuroPython 2024](https://ep2024.europython.eu/session/the-catch-in-rye-seeding-change-and-lessons-learned/) reminded me how overly complicated managing Python dependencies still tends to be with some combination of `"dev-requirements.in", "dev-requriements.txt", "pyproject.toml"`, plus instructions in the projects readme file about how the venv should be set up, I decided to take another look at uv, which is the successor of Rye.

The basic idea is that you can do everything with uv: from creating the Package Metadata (pyproject.toml) in the first place over adding dependencies and development dependencies to publishing your package to PyPi without even having to activate your venv. The starting-form-scatch case is very well documented at <https://docs.astral.sh/uv/guides/projects/>so I don't have to repeat it here. Also not covered in this post are other features than managing a projects dependencies.

Instead here is a quick run-down of what needs to be done to switch to uv from an existing project. Our current compromise is to use uv locally but still create a wheelhouse in the CI for deployments. [Hopefully uv will support this in the future as well.](https://github.com/astral-sh/uv/issues/1681)

### Moving dev-requirements.in to a dependency-group

Instead of having another set of files to specify development dependencies `uv`  used dependency-groups within the pyproject.toml. For a new project you could add those with `uv add --dev <whatever>` . For migrating an exisitng list it's easier to just edit the pyproject.toml directly by adding:

```
[dependency-groups]
dev = [
  "<whatever>",
]
```

Note that dependency groups have no meaning outside of uv, they are not optional dependencies (aka extras) which may be useful when using the project as a dependency somewhere else. The intention is to have a place to put dependencies needed internally before publishing the package (think pre-commit, pytest, mypy/pyright etc., *not* matplotlib required at runtime when setting some debug flag).

### Migrating pinned versions

In order to keep the versions pinned from other tools you have to convince uv to not update anything when first creating the uv.lock file. Unless I'm missing something there is no straightforward way to do this, so I resorted to installing pip and wheel and creating a wheelhouse with all the requirements and telling uv look up dependencies in the wheelhouse instead of the index:

```
$ uv pip install pip wheel
$ uv run pip wheel -w wheels/ -r requirements.txt -r dev-requirements.txt setuptools
$ uv lock -f wheels/ --no-index
```

Since uv creates platform-independent lock files it may complain about missing packages in the last step. Add those manually to the wheels and try again, e.g. if `"tzdata"` is missing:

```
$ uv run pip wheel -w wheels/ tzdata
$ uv lock -f wheels/ --no-index
```

Congtratulations, once uv has nothing left to complain about you have a lock file with the exact same versions pinned as before.

### Pre-Commit and CI-Configuration

This part is easy again, the examples at <https://docs.astral.sh/uv/guides/integration/pre-commit/> most likely just work for you. Below is a real-world example for a project where the backend has it's own sub-directory (`--project backend/`) and one of the requirements is not on PyPi so hashes would brake building the wheelhouse using `pip`  in the CI-Pipeline

```
- repo: https://github.com/astral-sh/uv-pre-commit
  rev: 0.7.18
  hooks:
    - id: uv-lock
      files: ^backend/(pyproject.toml|requirements.txt)$
      args: [--project, backend/]
    - id: uv-export
      files: ^backend/uv.lock$
      args: [--project, backend/, --no-dev, --output-file=backend/requirements.txt, --no-emit-workspace, --no-hashes]
    - id: uv-export
      files: ^backend/uv.lock$
      args: [--project, backend/, --only-dev, --output-file=backend/dev-requirements.txt, --no-emit-workspace, --no-hashes]
```

### So why did we do this again?

From the initial reason, that we just needed to replace `pip-tools` we now end up with a truly convenient developer experience where the setup guide becomes significantly simpler: instead of describing how to install which Python version on a specific Linux distro and setting up the venv (Debian does not package that with Python for whatever reason) and installing the requirements and installing the current project as editable and after all that the actual project-specific setup, it becomes this simple for a Django project for example:

```
# after installing uv (https://docs.astral.sh/uv/getting-started/installation/):
createdb <default-database-name>
uv run manage.py migrate
uv run manage.py runserver
```

``