# Next geOps Website

Next geOps Website based on Next.js

## Structure

Content in german and english is stored in `/content` as Markdown files using YAML frontmatter for metadata and managed by Netlify CMS. The Netlify CMS configuration can be found at `/public/config.yml`.

The generic page structure is defined in `/app/de` for german and in `/app/en` for english. Both page should use the same client component. Pages should only consist of components stored in `/components`.

## Development

```bash
# Install dependencies
yarn install

# Start dev server
yarn dev
```

## Support of html entities in blog, career content and contact person

We use [markdown-to-jsx](https://github.com/probablyup/markdown-to-jsx) to convert blog markdown file.
This library only support by default these entities:

- & (\&amp;)
- ' (\&apos;)
- \> (\&gt;)
- < (\&lt;)
- (\&nbsp;)
- " (\&quot;)

If you have to use another one, please add it to [namedCodesToUnicode.js](https://github.com/geops/website/blob/main/lib/namedCodesToUnicode.js).
You can find list of html entities and their unicode values [here](https://dev.w3.org/html5/html-author/charref).

## CMS

Edit website content on https://geops.com/admin
