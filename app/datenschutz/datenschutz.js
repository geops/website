"use client";

import Article from "../../components/Article.js";
import Layout from "../../components/Layout.js";
import { useI18n } from "../../lib/i18n.js";

export default function Privacy({ content }) {
  const { t } = useI18n();
  const title = t("privacy.title");
  return (
    <Layout
      title={title}
      path={t("privacy.path")}
      translationPath={t("privacy.translationPath")}
    >
      <Article title={title} body={content.body} />
    </Layout>
  );
}
