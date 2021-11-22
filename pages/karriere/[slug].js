import Article from "../../components/Article.js";
import { ch, de } from "../../components/Contact.js";
import ContactPerson from "../../components/ContactPerson.js";
import Layout from "../../components/Layout.js";
import Share from "../../components/Share.js";

import getContentBySlug from "../../lib/getContentBySlug";
import getContentItem from "../../lib/getContentItem";
import getContentList from "../../lib/getContentList";
import { useI18n } from "../../lib/i18n";

export default function Job({ content, job }) {
  const { t } = useI18n();
  const size = 55; // Size for share button

  if (!job) {
    return null;
  }

  return (
    <Layout
      description={job.summary}
      translationPath={`${t("career.translationPath")}/${job.translationSlug}`}
    >
      <div className="hidden xl:block xl:sticky xl:top-4 mx-auto max-w-screen-lg">
        {/* >xl*/}
        <Share />
      </div>
      <Article body={job.body} title={job.title} />
      <div className="xl:hidden mx-auto max-w-screen-lg">
        {/* <xl */}
        <Share />
      </div>
      <ContactPerson
        person={content.contact}
        title={content.title}
        subtitle={content.subtitle}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            title: job.title,
            description: job.body,
            datePosted: job.created,
            hiringOrganization: {
              "@type": "Organization",
              name: "geOps",
              sameAs: "http://geops.ch",
            },
            jobLocation: [
              {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: ch.street,
                  addressLocality: ch.city,
                  postalCode: ch.postalCode,
                  addressCountry: "CH",
                },
              },
              {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: de.street,
                  addressLocality: de.city,
                  postalCode: de.postalCode,
                  addressCountry: "DE",
                },
              },
            ],
          }),
        }}
      />
    </Layout>
  );
}

export async function getStaticPaths(context) {
  const list = getContentList(context.language || "de", {
    collections: ["job"],
    fields: ["slug"],
  });
  return {
    paths: list.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const language = context.language || "de";
  const job = getContentBySlug(language, "job", context.params.slug);
  const content = getContentItem(language, "page", "job.json");

  return { props: { language, content, job } };
}
