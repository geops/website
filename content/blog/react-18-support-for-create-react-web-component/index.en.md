---
title: React 18 support for create-react-web-component
summary: We want to update five year old dependencies the trafimage-maps
  project. But it appears one project dependency is deprecated. What should we
  do? Fix the project or use something else? We decided to fix the project and
  give back to the community.
author: Olivier Terral
cover: /images/blog/react-18-support-for-create-react-web-component/markus-spiske-8oykwqgbskq-unsplash.jpg
created: 2023-12-19
slug: react-18-support-for-create-react-web-component
tags:
  - developers
  - geops
  - javascript
frontpageImage: /images/blog/react-18-support-for-create-react-web-component/markus-spiske-8oykwqgbskq-unsplash-small-optim.jpg
published: true
---
Five years ago, we decided to transform the react application [maps.trafimage.ch](https://maps.trafimage.ch) (see project on [github](https://github.com/geops/trafimage-maps)) to a web component to facilitate the integration in Angular apps and other non-react environments.

At the time, there were not a lot of libraries that could do that. One of them was 
[create-react-web-component](https://www.npmjs.com/package/create-react-web-component), thanks to [SimonHoiberg](https://github.com/SimonHoiberg) for this library. It was so easy to use that we decided to keep it.

Five years is long time in the javascript world, but for various reasons (mostly interdependency between packages and/or node version support) we hadn't updated dependencies like Node, OpenLayers, React and Material UI to their latest major versions.

But now the time had come to face the inevitable. We decided to upgrade of a dozen major versions all at once.

To our surprise, the updates mostly went smoothly, since all libraries turned out to be compatible with React 18. After some minor transpilation issues and refactoring of the testing environment, everything worked as expected.

Until a major problem emerged:

![github project archived and deprecated](/images/blog/react-18-support-for-create-react-web-component/github-deprecated.png "github project archived and deprecated")

The github project of create-react-web-component is archived and the npm package is deprecated. My nightmare as OpenSource developer came true.

![developer nightmare](/images/blog/react-18-support-for-create-react-web-component/dev-nightmare.gif "developer nightmare")

The package is pinned to React 16. I hoped someone had forked the project and fixed it, but no luck. So two choices remained: find another package that does the same thing or get my hands dirty and fix the project myself.

After some research I found there are many more projects than five years ago that make react web-components, but none of them do exactly what create-react-web-component does. Specifically, none of them are able to pass non-serializable objects in such a simple way. 

After a couple of hours of testing, I gave up and decided that fixing create-react-web-component myself was the best solution. I saw it as a challenge and was excited to find a way to make it work.

In contrast to five years ago, I now have a lot more experience using web-components. I also knew that React 18 introduced a new render function, which I assumed was the problem.

So I forked the project on the [geOps github repository](https://github.com/geops/create-react-web-component) and got coding. And it turned out it was as easy as I had hoped.

Transforming a react component to a web component is not so complicated. I could have copy/pasted my code updates into the trafimage-maps project, but what is the point of using OpenSource if you never give back.

![this is the way](/images/blog/react-18-support-for-create-react-web-component/this-is-the-way.webp "this is the way")

As a bonus, I removed all the CRA cli stuff and poylfill. It will make the project easier to manage. Now the user project is responsible to transpile it and add poylfill if needed.

So the geOps team is happy to announce that we have published a new version of create-react-web-component with React 18support under the name [@geops/create-react-web-component](https://www.npmjs.com/package/@geops/create-react-web-component) 

Merry christmas!!