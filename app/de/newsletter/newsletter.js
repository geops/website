"use client";

import Layout from "../../../components/Layout.js";
import NewsletterForm from "../../../components/NewsletterForm.js";
import PageHeader from "../../../components/PageHeader.js";

export default function Newsletter({ content }) {
  return (
    <Layout
      title="Newsletter"
      description={content.subtitle}
      path="/newsletter"
      translationPath="/newsletter"
    >
      <PageHeader title="Newsletter" />
      <NewsletterForm translations={content} />
    </Layout>
  );
}