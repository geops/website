import Article from "../../components/Article.js";
import Layout from "../../components/Layout.js";
import RelatedList from "../../components/RelatedList.js";

import getContentList from "../../lib/getContentList";
import getContentBySlug from "../../lib/getContentBySlug";
import getRelatedContentList from "../../lib/getRelatedContentList";

export default function BlogArticle({ item, related }) {
  if (!item) {
    return null;
  }

  return (
    <Layout
      description={item.summary}
      translationPath={`/blog/${item.translationSlug}`}
    >
      <Article
        author={item.author}
        body={item.body}
        created={item.created}
        imageSizes={item.imageSizes}
        title={item.title}
      />
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
