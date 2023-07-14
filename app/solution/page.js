import getContentList from "../../lib/getContentList.js";
import ArticleIndex from "./article.js";

export async function getProps(language) {
  const solutions = getContentList(language, {
    collections: ["solution"],
    fields: [
      "color",
      "gridImage",
      "logo",
      "summary",
      "slug",
      "title",
      "weight",
    ],
    order: [{ weight: "asc" }],
  });
  return { language, solutions };
}

export default async function Page(context) {
  const {
    params: { lang = "de" },
  } = context;
  const props = await getProps(lang);
  return <ArticleIndex {...props} />;
}
