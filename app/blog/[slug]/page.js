import getContentList from "../../../lib/getContentList.js";
import Slug from "./slug.js";
import getContentBySlug from "../../../lib/getContentBySlug.js";
import getRelatedContentList from "../../../lib/getRelatedContentList.js";

// export async function getStaticPaths(context) {
//   const list = getContentList(context.language || "de", {
//     collections: ["blog"],
//     fields: ["slug"],
//   });
//   return {
//     paths: list.map(({ slug }) => ({ params: { slug } })),
//     fallback: false,
//   };
// }

export async function generateStaticParams() {
  const list = getContentList("de", {
    collections: ["blog"],
    fields: ["slug"],
  });

  return list.map(({ slug }) => ({
    slug,
  }));
}

// export async function getStaticProps(context) {
//   const language = context.language || "de";
//   const item = getContentBySlug(language, "blog", context.params.slug);
//   const related = getRelatedContentList(language, item);

//   return { props: { language, item, related } };
// }

export async function getProps(language, slug) {
  const item = getContentBySlug(language, "blog", slug);
  const related = getRelatedContentList(language, item);
  return { language, item, related };
}

export default async function Page(context) {
  const {
    params: { lang = "de", slug },
  } = context;
  const props = await getProps(lang, slug);
  return <Slug {...props} />;
}
