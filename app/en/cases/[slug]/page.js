import getContentList from "../../../../lib/getContentList.js";
import { getCasesSlugProps } from "../../../../lib/getProps.js";
import { generateCasesSlugMetadata } from "../../../../lib/getMetadata.js";
import CasesArticle from "../../../../components/CasesArticle.js";

export async function generateMetadata({ params: { slug } }) {
  const md = await generateCasesSlugMetadata("en", slug);
  return md;
}

export async function generateStaticParams() {
  const list = getContentList("en", {
    collections: ["cases"],
    fields: ["slug"],
  });

  return list.map(({ slug }) => ({
    slug,
  }));
}

export default async function Page({ params: { slug } }) {
  const props = await getCasesSlugProps("en", slug);
  return <CasesArticle {...props} />;
}
