import ArticleIndex from "../../../components/CasesIndex.js";
import { getCasesProps } from "../../../lib/getProps.js";
import { generateCasesMetadata } from "../../../lib/getMetadata.js";

export async function generateMetadata() {
  const md = await generateCasesMetadata("de", "/de/cases", "/en/cases");
  return md;
}

export default async function Page() {
  const props = await getCasesProps("de");
  return <ArticleIndex {...props} />;
}
