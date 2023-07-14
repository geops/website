import getContentItem from "../../lib/getContentItem";
import Imprint from "./impressum";

export async function getProps(language) {
  const content = getContentItem(language, "page", "imprint.json");
  return { content, language };
}

export default async function Page(context) {
  const {
    params: { lang = "de" },
  } = context;
  // Fetch data directly in a Server Component
  const props = await getProps(lang);
  return <Imprint {...props} />;
}
