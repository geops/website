import getContentBySlug from "../../../lib/getContentBySlug.js";
import getContentList from "../../../lib/getContentList.js";
import getRelatedContentList from "../../../lib/getRelatedContentList.js";
import Slug from "./slug.js";

export async function generateStaticParams() {
  const list = getContentList("de", {
    collections: ["solution"],
    fields: ["slug"],
  });

  return list.map(({ slug }) => ({
    slug,
  }));
}

export async function getProps(language, slug) {
  const solution = getContentBySlug(language, "solution", slug);
  const related = getRelatedContentList(language, solution);
  return { language, related, solution };
}

export default async function Page(context) {
  const {
    params: { lang = "de", slug },
  } = context;
  const props = await getProps(lang, slug);
  return <Slug {...props} />;
}
