import Article from "../components/Article.js";
import Layout from "../components/Layout.js";

import getContentItem from "../lib/getContentItem";
import { useI18n } from "../lib/i18n";
import markdownToHtml from "../lib/markdownToHtml";

export default function Privacy({ content }) {
  const { t } = useI18n();
  return (
    <Layout translationPath={t("privacy.translationPath")}>
      <Article body={content.body} title={t("privacy.title")} />
    </Layout>
  );
}

export async function getStaticProps(context) {
  const language = context.language || "de";
  const content = getContentItem(language, "page", "privacy.json");
  content.body = await markdownToHtml(content.body);
  return { props: { content, language } };
}
