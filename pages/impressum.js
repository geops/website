import Article from "../components/Article.js";
import Layout from "../components/Layout.js";

import getContentItem from "../lib/getContentItem";
import { useI18n } from "../lib/i18n";

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function Imprint({ content }) {
  const { t } = useI18n();
  const title = t("imprint.title");
  return (
    <Layout title={title} translationPath={t("imprint.translationPath")}>
      <Article title={title} body={content.body} />
    </Layout>
  );
}

export async function getStaticProps(context) {
  const language = context.language || "de";
  const content = getContentItem(language, "page", "imprint.json");

  return { props: { content, language } };
}
