import Privacy from "../../../components/Privacy.js";
import { generatePrivacyMetadata } from "../../../lib/getMetadata.js";
import { getPrivacyProps } from "../../../lib/getProps";

export async function generateMetadata() {
  const md = await generatePrivacyMetadata("de");
  return md;
}

export default async function Page(context) {
  const {
    params: { lang = "de" },
  } = context;
  // Fetch data directly in a Server Component
  const props = await getPrivacyProps(lang);
  return <Privacy {...props} />;
}
