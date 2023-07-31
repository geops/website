import { getImpressumProps } from "../../../lib/getProps";
import Imprint from "../../../components/Impressum.js";
import { generateImpressumMetadata } from "../../../lib/getMetadata";

export async function generateMetadata() {
  const md = await generateImpressumMetadata("en");
  return md;
}
export default async function Page(context) {
  const {
    params: { lang = "en" },
  } = context;
  // Fetch data directly in a Server Component
  const props = await getImpressumProps(lang);
  return <Imprint {...props} />;
}
