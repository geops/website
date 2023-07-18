import { getCarreerSlugProps } from "../../../../lib/getProps.js";
import getContentList from "../../../../lib/getContentList.js";
import Slug from "../../../../components/CareerArticle.js";
import { generateCareerSlugMetadata } from "../../../../lib/getMetadata.js";

export const unstable_excludeFiles = ["./content/**", "./public/images/**"];

export async function generateMetadata({ params: { slug } }) {
  const md = await generateCareerSlugMetadata("de", slug);
  return md;
}

export async function generateStaticParams() {
  const list = getContentList("de", {
    collections: ["job"],
    fields: ["slug"],
  });

  return list.map(({ slug }) => ({
    slug,
  }));
}

export default async function Page(context) {
  const {
    params: { lang = "de", slug },
  } = context;
  const props = await getCarreerSlugProps(lang, slug);
  return <Slug {...props} />;
}
