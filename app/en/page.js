import Home from "../../components/Home.js";
import { getHomeProps as getProps } from "../../lib/getProps.js";
import { generateHomeMetadata } from "../../lib/getMetadata.js";

export async function generateMetadata() {
  const md = await generateHomeMetadata("en");
  return md;
}

export default async function Page() {
  const props = await getProps("en");
  return <Home {...props} />;
}
