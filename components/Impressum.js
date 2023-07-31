"use client";

import Article from "./Article.js";
import Layout from "./Layout.js";
import { useI18n } from "../lib/i18n.js";

export default function Imprint({ content }) {
  const { t } = useI18n();
  const title = t("imprint.title");
  return (
    <Layout
      title={title}
      path={t("imprint.path")}
      translationPath={t("imprint.translationPath")}
    >
      <Article title={title} body={content.body} />
    </Layout>
  );
}
