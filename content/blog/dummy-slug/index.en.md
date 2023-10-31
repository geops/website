---
title: Swiss Python Summit 2023
summary: On September 21, 2023, our backend developer Tobias made his way to
  Rapperswil to attend the Swiss Python Summit 2023.
author: Tobias Kronauer
created: 2023-10-31
slug: swiss-python-summit-2023-conference
frontpageImage: /images/blog/swiss-python-summit-2023/img_0392.jpg
published: false
---
On September 21, 2023, I attended the [Swiss Python Summit](https://www.python-summit.ch/) in Rapperswil, Switzerland. The organization sees itself as the Swiss version of EuroPython 2015 and has been taking place since 2016. The goal is an exchange of knowledge between Python users and is aimed at both beginners and experienced users.

The conference took place in beautiful early autumn weather in a building of the OST University of Applied Sciences, located directly at Lake Zurich.

The choice of topics of the speakers was very broad and served several target groups, from scientific talks on applications of Machine Learning to web development with Python to an introduction to Cpython. Despite their diversity, all talks had one thing in common: they picked you up very well, but still went into good detail.

One interesting talk was about the Libary [Kivy](https://kivy.org/), which enables front-end development in Python. While Python is mainly known for the backend, it was exciting to see what developments are happening in the frontend. One of the main focuses of Kivy is to develop apps for different platforms with one code base, which reduces the development effort a lot. The library is still in its infancy, but offers itself as an interesting alternative to [PyQt](https://riverbankcomputing.com/software/pyqt/intro).

In the talk [A walk with Cpython](https://www.youtube.com/watch?v=36ntN0u7Bm0&feature=youtu.be&themeRefresh=1) the focus was on introducing the audience to the world of the Python compiler. Based on a simple Python script the background steps of Cpython, the reference implementation of Python, were explained. The goal was to demystify foreign words like [Abstract Syntax Tree](https://devguide.python.org/internals/compiler/#abstract-syntax-trees-ast), [Continuous Flow Graph](https://devguide.python.org/internals/compiler/#control-flow-graphs), OPCODES, etc. Although a thorough understanding of Python implementation is rarely needed for web development, it helps a lot for background understanding. It also gives one the ability to write more performant code and understand why it runs faster (such as [List Comprehensions under Python 3.11](https://docs.python.org/3.11/whatsnew/3.11.html#pep-659-specializing-adaptive-interpreter)).

The tiresome but all the more important topic of "documentation" was covered in the talk "Documenting Python Code". The critical view of Christian Heitzmann on the process of documentation helps to further optimize and question internal processes. At the same time, it became clear that the internal processes of geOps largely correspond to the recommendations of the speaker. A very encouraging feeling!

Towards the end, the most interesting talk began: [A Short History of Python Web Frameworks](https://www.youtube.com/watch?v=K3y3f3mLJfk&feature=youtu.be). Quazi Nafiul Islam took you through the historical development of web frameworks in Python. Starting with the first version of the HTTP protocol in the 90s, he showed the evolution of Python frameworks, interfaces, etc. to today's all-encompassing libraries like Django. He also addressed why frameworks stand the test of time while others disappear relatively quickly. The main argument in his opinion: the openness of the development team to implement new technologies.

The conference was rounded off with short lightning talks, in which participants from the audience could present small Python tricks.

In the evening at 5 pm I went home by train. All in all, it was an enriching conference that gave us new knowledge, but at the same time also refreshed existing knowledge.
