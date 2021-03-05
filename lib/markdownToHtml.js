import remark from "remark";
import externalLinks from "remark-external-links";
import html from "remark-html";

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(externalLinks, { rel: false, target: "_blank" })
    .use(html)
    .process(markdown);
  return result.toString();
}
