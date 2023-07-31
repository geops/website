import Home from "../../components/Home.js";
import { getHomeProps } from "../../lib/getProps.js";
import { generateHomeMetadata } from "../../lib/getMetadata.js";

export async function generateMetadata() {
  const md = await generateHomeMetadata("de");
  return md;
}

export default async function Page() {
  const props = await getHomeProps("de");
  return <Home {...props} />;
}
