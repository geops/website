import { getNewsletterProps } from "../../../lib/getProps";
import { generateNewsletterMetadata } from "../../../lib/getMetadata";
import Newsletter from "./newsletter";

export async function generateMetadata() {
  const md = await generateNewsletterMetadata("de");
  return md;
}

export default async function Page() {
  const props = await getNewsletterProps("de");
  return <Newsletter {...props} />;
}
