import Layout from "../components/Layout.js";
import NewsletterForm from "../components/NewsletterForm.js";
import PageHeader from "../components/PageHeader.js";

import getContentItem from "../lib/getContentItem";

export default function Newsletter({ translations }) {
  return (
    <Layout description={translations.subtitle} translationPath="/newsletter">
      <PageHeader title="Newsletter" />
      <NewsletterForm translations={translations} />
    </Layout>
  );
}

export function getStaticProps(context) {
  const language = context.language || "de";
  const translations = getContentItem(language, "page", "newsletter.json");
  return { props: { language, translations } };
}
