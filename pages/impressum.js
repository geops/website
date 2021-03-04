import Article from "../components/Article.js";
import Layout from "../components/Layout.js";

import getContentItem from "../lib/getContentItem";
import markdownToHtml from "../lib/markdownToHtml";
import { useI18n } from "../lib/i18n";

export default function Imprint({ content }) {
  const { t } = useI18n();
  return (
    <Layout translationPath={t("imprint.translationPath")}>
      <Article body={content.body} title={t("imprint.title")} />
    </Layout>
  );
}

export async function getStaticProps(context) {
  const language = context.language || "de";
  const content = getContentItem(language, "page", "imprint.json");
  content.body = await markdownToHtml(content.body);
  return { props: { content, language } };
}
