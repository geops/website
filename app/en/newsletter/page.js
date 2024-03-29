import { getNewsletterProps } from "../../../lib/getProps";
import { generateNewsletterMetadata } from "../../../lib/getMetadata";
import Newsletter from "../../../components/Newsletter";

export async function generateMetadata() {
  const md = await generateNewsletterMetadata(
    "en",
    "/de/newsletter",
    "/en/newsletter",
  );
  return md;
}

export default async function Page() {
  const props = await getNewsletterProps("en");
  return <Newsletter {...props} />;
}
