import { remark } from "remark";
import externalLinks from "remark-external-links";
import highlight from "remark-highlight.js";
import html from "remark-html";

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(externalLinks, { rel: false, target: "_blank" })
    .use(highlight)
    .use(html, { sanitize: false })
    .process(markdown);
  return result.toString();
}
