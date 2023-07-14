import getContentBySlug from "../../../lib/getContentBySlug.js";
import getContentItem from "../../../lib/getContentItem.js";
import getContentList from "../../../lib/getContentList.js";
import Slug from "./slug.js";

export async function generateStaticParams() {
  const list = getContentList("de", {
    collections: ["job"],
    fields: ["slug"],
  });

  return list.map(({ slug }) => ({
    slug,
  }));
}

export async function getProps(language, slug) {
  const job = getContentBySlug(language, "job", slug);
  const content = getContentItem(language, "page", "job.json");
  return { language, content, job };
}

export default async function Page(context) {
  const {
    params: { lang = "de", slug },
  } = context;
  const props = await getProps(lang, slug);
  return <Slug {...props} />;
}
