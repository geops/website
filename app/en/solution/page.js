import ArticleIndex from "../../../components/SolutionIndex.js";
import { getSolutionProps } from "../../../lib/getProps.js";
import { generateSolutionMetadata } from "../../../lib/getMetadata.js";

export async function generateMetadata() {
  const md = await generateSolutionMetadata("en");
  return md;
}

export default async function Page() {
  const props = await getSolutionProps("en");
  return <ArticleIndex {...props} />;
}
