import ArticleIndex from "../../../components/BlogIndex.js";
import { getBlogProps } from "../../../lib/getProps.js";
import { generateBlogMetadata } from "../../../lib/getMetadata.js";

export async function generateMetadata() {
  const md = await generateBlogMetadata("de");
  return md;
}

export default async function Page(context) {
  const {
    params: { lang = "de" },
  } = context;
  const props = await getBlogProps(lang);
  return <ArticleIndex {...props} />;
}
