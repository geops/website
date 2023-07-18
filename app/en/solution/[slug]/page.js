import getContentBySlug from "../../../../lib/getContentBySlug.js";
import getContentList from "../../../../lib/getContentList.js";
import getRelatedContentList from "../../../../lib/getRelatedContentList.js";
import { getSolutionSlugProps } from "../../../../lib/getProps.js";
import { generateSolutionSlugMetadata } from "../../../../lib/getMetadata.js";
import Slug from "../../../../components/SolutionArtcile.js";

export async function generateMetadata({ params: { slug } }) {
  const md = await generateSolutionSlugMetadata(
    "en",
    slug,
    "/de/solution/" + slug,
    "/en/solution/" + slug,
  );
  return md;
}

export async function generateStaticParams() {
  const list = getContentList("en", {
    collections: ["solution"],
    fields: ["slug"],
  });

  return list.map(({ slug }) => ({
    slug,
  }));
}

export default async function Page({ params: { slug } }) {
  const props = await getSolutionSlugProps("en", slug);
  return <Slug {...props} />;
}
