import Article from "../../components/Article.js";
import { ch, de } from "../../components/Contact.js";
import ContactPerson from "../../components/ContactPerson.js";
import Layout from "../../components/Layout.js";

import getContentBySlug from "../../lib/getContentBySlug";
import getContentItem from "../../lib/getContentItem";
import getContentList from "../../lib/getContentList";
import markdownToHtml from "../../lib/markdownToHtml";

export default function Job({ content, job }) {
  if (!job) {
    return null;
  }

  return (
    <Layout
      description={job.summary}
      translationPath={`/career/${job.translationSlug}`}
    >
      <Article body={job.body} title={job.title} />
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
  job.body = await markdownToHtml(job.body);

  const content = getContentItem(language, "page", "job.json");
  content.subtitle = await markdownToHtml(content.subtitle);

  return { props: { language, content, job } };
}
