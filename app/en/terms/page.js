import { getTermsProps } from "../../../lib/getProps";
import Imprint from "../../../components/Terms.js";
import { generateTermsMetadata } from "../../../lib/getMetadata";

export async function generateMetadata() {
  const md = await generateTermsMetadata("en");
  return md;
}

export default async function Page(context) {
  const {
    params: { lang = "en" },
  } = context;
  // Fetch data directly in a Server Component
  const props = await getTermsProps(lang);
  return <Imprint {...props} />;
}
