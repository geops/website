import BlogList from "../../components/BlogList.js";
import Layout from "../../components/Layout.js";
import PageHeader from "../../components/PageHeader.js";

import generateFeeds from "../../lib/generateFeeds";
import getContentList from "../../lib/getContentList";
import { useI18n } from "../../lib/i18n";

export default function BlogIndex({ list }) {
  const { t } = useI18n();
  return (
    <Layout description={t("blog.header")} translationPath="/blog">
      <PageHeader
        src="/images/blog/header.jpg"
        srcMobile="/images/blog/header-mobile.jpg"
        title="Blog"
        text={t("blog.header")}
      />
      <BlogList list={list} />
    </Layout>
  );
}

export async function getStaticProps(context) {
  const language = context.language || "de";
  const list = getContentList(language, {
    collections: ["blog"],
    fields: ["cover", "created", "title", "summary", "slug", "readingTime"],
    order: [{ created: "desc" }],
  });
  generateFeeds(list, language);
  return { props: { language, list } };
}
