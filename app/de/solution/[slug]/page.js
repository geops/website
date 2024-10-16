import getContentList from "../../../../lib/getContentList.js";
import { getSolutionSlugProps } from "../../../../lib/getProps.js";
import { generateSolutionSlugMetadata } from "../../../../lib/getMetadata.js";
import Slug from "../../../../components/SolutionArticle.js";

export async function generateMetadata({ params: { slug } }) {
  const md = await generateSolutionSlugMetadata("de", slug);
  return md;
}

export async function generateStaticParams() {
  const list = getContentList("de", {
    collections: ["solution"],
    fields: ["slug"],
  });

  return list.map(({ slug }) => ({
    slug,
  }));
}

export default async function Page({ params: { slug } }) {
  const props = await getSolutionSlugProps("de", slug);
  return <Slug {...props} />;
}
