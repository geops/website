"use client";

import Layout from "./Layout.js";
import NewsletterForm from "./NewsletterForm.js";

export default function Newsletter({ content }) {
  return (
    <Layout
      title="Newsletter"
      description={content.subtitle}
      path="/newsletter"
      translationPath="/newsletter"
    >
      <NewsletterForm translations={content} />
    </Layout>
  );
}
