---
title: Tree App in Transition – Refactoring for the Forest’s Future
summary: The Tree App has undergone a comprehensive technical overhaul to improve maintainability,
  performance, and mobile usability – including modern technologies such as TypeScript,
  Next.js, and an integrated database for storing recommendations. The scientific logic remains
  unchanged, enhanced by new features like sharing your own tree species recommendations on the map.
created: 2025-04-14
cover: /images/blog/treeapp-in-transition-refactoring-for-the-future-of-the-forest/thumbnail_treeapp_0.png
slug: tree-app-refactoring
tags:
  - treeapp
  - environment
author: Elke Erhardt & Daniel Marsh-Hunn
published: true
---
Long-term decisions are the foundation of sustainable forest management – and that's exactly where the [Tree App](https://www.tree-app.ch) comes in. Developed by geOps on behalf of the Swiss Federal Institute for Forest, Snow and Landscape Research (WSL), the app offers tree species recommendations for various site types based on climate scenarios and current research findings. It supports forest managers in future-proof planning.

### Why Refactoring?

Since the first version of the Tree App, not only has the climate changed, but so has the technological landscape. To ensure the application remains maintainable, flexible, and future-ready, a fundamental overhaul of the existing codebase was undertaken.

The previous architectural approach – using local JSON files as the data source for all Tree App content – posed limitations in terms of performance, maintainability, and customization. By switching to a local SQLite database, data can now be specifically queried via SQL, such as for debugging. This upgrade also improves the overall performance of the app.

### Technological Upgrade

As part of the refactoring, the Tree App has also been technically brought up to date with version 3.0:

* **TypeScript:** For better type safety, improved error analysis, and long-term maintainability.
* **Tailwind CSS:** For a more flexible, component-based UI.
* **Next.js:** A modern React framework enabling server-side rendering, improved performance, and simplified routing structures.
* **sql.js:** For client-side use of structured data, seamlessly integrated into the app.
* **Integrated database:** Newly introduced to store individual site preferences and recommendations.

### New Layout – Optimized for Mobile Use

Along with the refactoring, the app’s layout was redesigned. The goal was to make the interface more intuitive, use space more efficiently, and significantly improve usability on mobile devices. The app now adapts even better to various screen sizes – an important step, as many users access the Tree App directly in the field.

![](/images/blog/treeapp-in-transition-refactoring-for-the-future-of-the-forest/tree-app_gespeicherte_nutzerdaten.png)

### Saved User Data – Making Recommendations Visible

One of the most important new features of the revamped Tree App is the ability to save manually created tree species recommendations. Users can select their own sites and now permanently store them in the app.

These saved data points can optionally appear on the map layers, making them visible to all users. This encourages exchange and offers insights into practical on-site assessments.

### Continuity Despite Change

Despite the extensive technical adjustments, one thing remains unchanged: the scientific logic and data foundation of the Tree App. All recommendations are still based on the well-founded research of the WSL, including defined site types, elevation zones, and climate scenarios. Existing profiles and their content have also been carefully carried over and adapted.

### Conclusion

The Tree App remains what it has always been – a reliable decision-support tool for forestry. With refactoring, modern technologies, an improved layout, and new features, it is now more powerful and future-proof – just like the forests it was built to support.

Check out the Tree App [here](https://www.tree-app.ch).
