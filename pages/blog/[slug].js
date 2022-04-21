import Article from "../../components/Article.js";
import Layout from "../../components/Layout.js";
import RelatedList from "../../components/RelatedList.js";
import Share from "../../components/Share.js";

import getContentList from "../../lib/getContentList";
import getContentBySlug from "../../lib/getContentBySlug";
import getRelatedContentList from "../../lib/getRelatedContentList";

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function BlogArticle({ item, related }) {
  if (!item) {
    return null;
  }

  return (
    <Layout
      description={item.summary}
      translationPath={`/blog/${item.translationSlug}`}
    >
      <div className="mx-auto hidden max-w-screen-lg xl:sticky xl:top-4 xl:block">
        {/* > xl*/}
        <Share />
      </div>
      <Article
        author={item.author}
        body={item.body}
        created={item.created}
        imageSizes={item.imageSizes}
        title={item.title}
      />
      <div className="mx-auto mb-16 max-w-screen-lg xl:hidden">
        {/* < xl*/}
        <Share />
      </div>
      <RelatedList list={related} />
    </Layout>
  );
}

export async function getStaticPaths(context) {
  const list = getContentList(context.language || "de", {
    collections: ["blog"],
    fields: ["slug"],
  });
  return {
    paths: list.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const language = context.language || "de";
  const item = getContentBySlug(language, "blog", context.params.slug);
  const related = getRelatedContentList(language, item);

  return { props: { language, item, related } };
}
