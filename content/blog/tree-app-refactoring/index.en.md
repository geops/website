---
title: Tree App in transition - refactoring for the future of the forest
summary: The TreeApp has been technically modernized - with TypeScript, Next.js
  and an integrated database for recommendations. Improved performance, mobile
  usability and new functions such as sharing your own tree species
  recommendations round off the update.
created: 2025-04-14
cover: /images/blog/treeapp-in-transition-refactoring-for-the-future-of-the-forest/thumbnail_treeapp_0.png
slug: tree-app-refactoring
tags:
  - treeapp
  - environment
author: Elke Erhardt & Daniel Marsh-Hunn
published: true
---
Long-term decisions are the foundation of sustainable forest management - and this is exactly where the [Tree App](https://www.tree-app.ch) comes in. Developed by geOps on behalf of the Swiss Federal Institute for Forest, Snow and Landscape Research (WSL) and the Federal Office for the Environment (FOEN), the app offers tree species recommendations for various site types based on climate scenarios and current research findings. It thus supports forest managers in future-proof planning.

### Why refactoring?

Since the first version of the Tree App, not only the climate has changed, but also the technological landscape. In order to make the application maintainable, flexible and future-proof in the long term, it was decided to fundamentally revise the existing code base.

The previous architectural approach - local JSON files as the data source for all Tree App data - had limitations in terms of performance, maintainability and customization. By switching to a local sqlite database, data can now be easily retrieved via SQL, for example for debugging. This upgrade also improves the overall performance of the app.

### Technological upgrade

As part of the refactoring, the Tree App has also been technically updated to version 3.0:

* **TypeScript:** For more type safety, better error analysis and long-term maintainability.
* **Tailwind CSS:** For a more flexible, component-based UI
* **Next.js:** As a modern React framework for server-side rendering, better performance and simplified routing structures.
* **sql.js:** For client-side use of structured data, with seamless integration into the application.
* **Integrated database:** Newly introduced to store individual location preferences and recommendations.

### New layout - optimized for mobile use

With the refactoring, the layout of the application was also revised. The aim was to make the application interface clearer, use space more efficiently and significantly improve usability on mobile devices. The app now adapts even better to different screen sizes - an important step, as many users use the Tree app directly in the field.

![](/images/blog/treeapp-in-transition-refactoring-for-the-future-of-the-forest/tree-app_gespeicherte_nutzerdaten.png)

### Saved user data - make recommendations visible

One of the most important new functions of the revised Tree App is the option to save manually created tree species recommendations. Users can make their own location selections and save them permanently in the app.

This saved data appears - if desired - in the map layers and is thus visible to all users. This promotes exchange and provides insight into practical assessments on site.

### Continuity despite change

Despite the extensive technical adjustments, one thing remains unchanged: The scientific logic and data basis of the Tree App. All recommendations continue to be based on the sound findings of the WSL, including the defined site types, altitude levels and climate scenarios. Existing profiles and their content have also been carefully adopted and adapted.

### Conclusion

The Tree App remains what it has always been - a reliable tool for decision support in forestry. Refactoring, modern technologies, an improved layout and new functions have made it even more powerful and future-proof - just like the forests for which it was developed.

Click here for the [Tree App](https://www.tree-app.ch).
