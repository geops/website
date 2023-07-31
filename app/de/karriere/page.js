import ArticleIndex from "../../../components/CareerIndex.js";
import { getCarreerProps } from "../../../lib/getProps.js";
import { generateCareerMetadata } from "../../../lib/getMetadata.js";

export async function generateMetadata() {
  const md = await generateCareerMetadata("de", "/de/karriere", "en/career");
  return md;
}

export default async function Page() {
  const props = await getCarreerProps("de");
  return <ArticleIndex {...props} />;
}
