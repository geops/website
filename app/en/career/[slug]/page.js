import { getCarreerSlugProps } from "../../../../lib/getProps.js";
import getContentList from "../../../../lib/getContentList.js";
import Slug from "../../../../components/CareerArticle.js";
import { generateCareerSlugMetadata } from "../../../../lib/getMetadata.js";

export async function generateMetadata({ params: { slug } }) {
  const md = await generateCareerSlugMetadata("en", slug);
  return md;
}

export async function generateStaticParams() {
  const list = getContentList("en", {
    collections: ["job"],
    fields: ["slug"],
  });

  return list.map(({ slug }) => ({
    slug,
  }));
}

export default async function Page(context) {
  const {
    params: { lang = "en", slug },
  } = context;
  const props = await getCarreerSlugProps(lang, slug);
  return <Slug {...props} />;
}
