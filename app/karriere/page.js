import getContentList from "../../lib/getContentList.js";
import generateFeeds from "../../lib/generateFeeds.js";
import getContentItem from "../../lib/getContentItem.js";
import ArticleIndex from "./article.js";

export async function getProps(language) {
  const jobs = getContentList(language, {
    collections: ["job"],
    fields: ["title", "summary", "slug"],
  });
  const content = getContentItem(language, "page", "career.json");

  return { language, content, jobs };
}

export default async function Page(context) {
  const {
    params: { lang = "de" },
  } = context;
  const props = await getProps(lang);
  return <ArticleIndex {...props} />;
}
