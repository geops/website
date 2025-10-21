import getContentList from "../../../../lib/getContentList.js";
import { getCasesSlugProps } from "../../../../lib/getProps.js";
import { generateCasesSlugMetadata } from "../../../../lib/getMetadata.js";
import CasesArticle from "../../../../components/CasesArticle.js";

export async function generateMetadata({ params: { slug } }) {
  const md = await generateCasesSlugMetadata("de", slug);
  return md;
}

export async function generateStaticParams() {
  const list = getContentList("de", {
    collections: ["cases"],
    fields: ["slug"],
  });

  return list.map(({ slug }) => ({
    slug,
  }));
}

export default async function Page({ params: { slug } }) {
  const props = await getCasesSlugProps("de", slug);
  return <CasesArticle {...props} />;
}
