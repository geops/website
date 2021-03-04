# Next geOps Website

Next geOps Website based on Next.js

## Structure

Content in german and english is stored in `/content` as Markdown files using YAML frontmatter for metadata and managed by Netlify CMS. The Netlify CMS configuration can be found at `/public/config.yml`.

The generic page structure is defined in `/pages` for german and in `/pages/en` for english. English pages should reuse german pages if possible. Pages should only consist of components stored in `/components`.
