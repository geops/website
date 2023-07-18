"use client";

import BlogList from "./BlogList.js";
import Layout from "./Layout.js";
import PageHeader from "./PageHeader.js";
import { useI18n } from "../lib/i18n.js";

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function BlogIndex({ list }) {
  const { t } = useI18n();
  const title = "Blog";
  return (
    <Layout
      title={title}
      description={t("blog.header")}
      path="/blog"
      translationPath="/blog"
      shareImg={list && list[0]?.cover}
    >
      <PageHeader
        src="/images/blog/header.jpg"
        srcMobile="/images/blog/header-mobile.jpg"
        title={title}
        text={t("blog.header")}
      />
      <BlogList list={list} />
    </Layout>
  );
}
