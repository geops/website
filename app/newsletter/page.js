import getContentItem from "../../lib/getContentItem";
import Newsletter from "./newsletter";

export async function getProps(language) {
  const content = getContentItem(language, "page", "newsletter.json");
  return { content, language };
}

export default async function Page(context) {
  const {
    params: { lang = "de" },
  } = context;
  // Fetch data directly in a Server Component
  const props = await getProps(lang);
  return <Newsletter {...props} />;
}
