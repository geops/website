import { getSolutionProps } from "../../../lib/getProps.js";
import { generateSolutionMetadata } from "../../../lib/getMetadata.js";
import Cases from "../../../components/CasesIndex.js";

export async function generateMetadata() {
  const md = await generateSolutionMetadata(
    "de",
    "/de/solution",
    "/en/solution",
  );
  return md;
}

export default async function Page() {
  const props = await getSolutionProps("de");
  return <Cases cases={props.cases} />;
}
