"use client";

import Layout from "./Layout.js";
import NewsletterForm from "./NewsletterForm.js";
import PageHeader from "./PageHeader.js";

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
