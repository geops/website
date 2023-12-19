---
title: React 18 support for create-react-web-component
summary: We wanted to update 5-years old dependences the trafimage-maps project.
  But it appears one project was deprecated. What should we do? fix the project
  or use something else? We decide to fix the project and give back to the
  community.
author: Olivier Terral
cover: /images/blog/react-18-support-for-create-react-web-component/markus-spiske-8oykwqgbskq-unsplash.jpg
created: 2023-12-19
slug: react-18-support-for-create-react-web-component
tags:
  - developers
  - geops
  - javascript
published: true
---
Five years ago, we decide to transform the react application [maps.trafimage.ch](https:maps.trafimage.ch) (see project on [github](https://github.com/geops/trafimage-maps)) to a web component to facilitate the integration in an angular app and other non-react environments.

At the time, there was not a lot of library that could do that, one of them was 
[create-react-web-component](https://www.npmjs.com/package/create-react-web-component), thanks to [SimonHoiberg](https://github.com/SimonHoiberg) for this library.

It was so easy to use that we keep it.

Five years is long time in the javascript world, and for different reasons (mostly interdependency between packages and/or node version support) we haven't updated to the last major dependencies like Node, OpenLayers, React and Material UI.

But it was time, time for a big update of dozen major versions to update all at  once.

It appears that it works pretty well, all librairies worked with React 18, it takes a few days of course, but except transpilation problems and update of testing librairies everythings works as expected.

Until a big problem comes out :

![github project archived and deprecated](/images/blog/react-18-support-for-create-react-web-component/github-deprecated.png "github project archived and deprecated")

The  github project of create-react-web-component  is archived and the npm package is deprecated. My nightmare as OpenSource developer comes true.

![developer nightmare](/images/blog/react-18-support-for-create-react-web-component/dev-nightmare.gif "developer nightmare")

The package is blocked to React 16. I hoped someone forked the project and fixed it but no. So 2 choices, find another package that does the same thing or get my hand dirty and fix the project of my own.

After some research there is a lot more projects than 5 years ago that does the same things. But none of them does exactly what does create-react-web-component, by that, I mean  be able to pass non serializable object in a so simple way. After a couple of hours of testing, I gave up and decided that fixing create-rect-web-component was the best solution and I also liked the challenge.

Since 5 years, I have a lot more experience using web-component. I also knew that React 18 introduced a new render function, and so, that was probably the problem.

So I forked the project on \[geOps github repository](https://github.com/geops/create-react-web-component). and it appears it was as easy as it sounded.

Transforming a react component to a web component is not so complicated. I could have copy/paste the 2 classes in the trafimage-maps project, but well, what the point to use OpenSource if you never give back.

![this the way](/images/blog/react-18-support-for-create-react-web-component/this-is-the-way.webp "this is the way")

In bonus, I've removed all the CRA cli stuff and poylfill. It will make the project easier to manage. Now the user project is responsible to transpile it and add poylfill if needed.

So the geOps team is happy to share that we have published a new package version of create-react-web-component that supports React 18 under the name [@geops/create-react-web-component](https://www.npmjs.com/package/@geops/create-react-web-component) 

Merry christmas!!