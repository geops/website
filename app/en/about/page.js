import About from "../../../components/About.js";
import { getAboutProps } from "../../../lib/getProps.js";

export default async function Page(context) {
  const {
    params: { lang = "en" },
  } = context;
  // Fetch data directly in a Server Component
  const props = await getAboutProps(lang);
  return <About {...props} />;
}
