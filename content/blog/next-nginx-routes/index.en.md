---
title: Next.js routing with Nginx
summary: Automatically generate a Nginx routing configuration for static Next.js
  projects.
author: Friedjoff Trautwein
created: 2022-03-28
slug: next-nginx-routes
tags:
  - developers
  - javascript
published: true
---
Since last year, we at geOps have been increasingly using the React framework [Next.js](https://nextjs.org/) as the basis for our front-end applications. Reasons are a rich feature set and a better experience for both end users and developers. From an end-user perspective high performance even for larger applications due to automatic *code splitting* is a big advantage. For developers [Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh) and support for tools like [ESLint](https://nextjs.org/docs/basic-features/eslint) and [TypeScript](https://nextjs.org/docs/basic-features/typescript) help to develope fast and reliable code.

We use [Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export), to ensure high performance as well as simple and reliabe deployments. While we lose a [few features](https://nextjs.org/docs/advanced-features/static-html-export#unsupported-features) that require a Node.js server, these features are usually covered by our own Python backends. This approach generates static HTML and JavaScript files in our CI, which are hosted by a [Nginx server](https://nginx.org/en/).

However, we didn't want to live without [Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes) support, so we created a [small NPM package](https://www.npmjs.com/package/next-nginx-routes) to automatically generate a routing configuration for Nginx. The information for this configuration is based on metadata in `.next/routes-manifest.json` which is created when running `next build`.

Using the NPM package is quickly explained in three steps:

1. in the Next.js project install the package: `yarn add --dev next-nginx-routes`.
2. add the export NPM script: `next build && next export && next-nginx-routes`
3. include the generated Nginx configuration file in the main configuration.

All three steps can be found in a [small example project](https://github.com/geops/next-nginx-routes/example) on GitHub. 

So far we have only used this approach in a few projects, so not all use cases are necessarily covered. In such cases, we are of course always happy to receive pull requests.