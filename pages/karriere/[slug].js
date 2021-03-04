import Layout from "../../components/Layout.js";
import Article from "../../components/Article.js";

import getContentBySlug from "../../lib/getContentBySlug";
import getContentList from "../../lib/getContentList";
import markdownToHtml from "../../lib/markdownToHtml";

export default function Job({ job }) {
  if (!job) {
    return null;
  }

  return (
    <Layout translationPath={`/career/${job.translationSlug}`}>
      <Article body={job.body} title={job.title} />
    </Layout>
  );
}

export async function getStaticPaths(context) {
  const list = getContentList(context.language || "de", {
    collections: ["job"],
    fields: ["slug"],
  });
  return {
    paths: list.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const language = context.language || "de";

  const job = getContentBySlug(language, "job", context.params.slug);
  job.body = await markdownToHtml(job.body);

  return { props: { language, job } };
}
