---
title: mapset 2.0 with MUI
summary: "mapset 2.0 has been widely refactored using the open-source react
  component library MUI (Material-UI). "
author: Daniel Marsh-Hunn
cover: /images/blog/mapset-2-0-with-mui/mapset_mui.png
created: 2022-06-08
slug: mapset-with-mui
tags:
  - developers
published: true
---
Development for mapset is in full swing again. For mapset 2.0 the dependencies on geOps-internal UI-libraries have been scrapped in favour of the open-source react component library [MUI](https://mui.com/) (Material-UI). 

Component libraries and frameworks make a frontend developers’ life easier in a lot of ways. Firstly, they can speed up development drastically, since the required components are very likely provided by the package. More often than not, the components are very easy to use and come along with detailed documentation and examples. Secondly, issues like browser compatibility and accessibility are usually included, saving the developer a lot of cumbersome code writing. MUI has been at the top of the popularity list of react component libraries for a while now, with 78k stars on Github and over 1.3 million weekly downloads on npm (status 25.05.2022). This made it an easy choice for geOps.

MUI provides a full suite of foundational to advanced react components. Apart from the usual UI-components like buttons, navbars, modals and forms, the library also offers functional elements and specialised [hooks](https://reactjs.org/docs/hooks-intro.html), making app development fast and easy. Out of the box MUI component styling is based on Google’s [Material Design](https://material.io/) system by default, but MUI provides multiple [approaches for style customisation](https://mui.com/material-ui/guides/interoperability/). 

Several geOps apps rely on MUI and new features in mapset have been developed using MUI components since 2020. However, several older components still relied on inhouse and/or other third-party libraries. By replacing them with MUI components, all app components now have access to an injected [MUI theme](https://mui.com/material-ui/customization/theming/), making global styling a walk in the park. Many of the refactored UI elements now use the same code base from MUI components, creating a more unified appearance and usage. A further improvement was the removal of most of the app’s SCSS files. mapset now uses MUI’s inbuilt js-to-CSS approach for styling. CSS is written as javaScript objects, the CSS classes are created when the app is compiled, resulting in a more stable compiling process.

Using MUI as main UI technology opens a whole new dimension of possibilities and approaches for fast and easy UI building. We are excited to see what future MUI versions have to offer and what new features may give mapset UI the extra touch for the best user experience.