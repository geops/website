import getContentItem from "../../lib/getContentItem";
import Privacy from "./datenschutz";

export async function getProps(language) {
  const content = getContentItem(language, "page", "privacy.json");
  return { content, language };
}

export default async function Page(context) {
  const {
    params: { lang = "de" },
  } = context;
  // Fetch data directly in a Server Component
  const props = await getProps(lang);
  return <Privacy {...props} />;
}
