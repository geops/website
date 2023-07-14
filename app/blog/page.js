import getContentList from "../../lib/getContentList.js";
import generateFeeds from "../../lib/generateFeeds.js";
import ArticleIndex from "./article.js";

export async function getProps(language) {
  const list = getContentList(language, {
    collections: ["blog"],
    fields: ["cover", "created", "title", "summary", "slug", "readingTime"],
    order: [{ created: "desc" }],
  });
  generateFeeds(list, language);
  return { language, list };
}

export default async function Page(context) {
  const {
    params: { lang = "de" },
  } = context;
  const props = await getProps(lang);
  return <ArticleIndex {...props} />;
}
