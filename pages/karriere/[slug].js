import Article from "../../components/Article.js";
import { ch, de } from "../../components/Contact.js";
import ContactPerson from "../../components/ContactPerson.js";
import Layout from "../../components/Layout.js";
import Share from "../../components/Share.js";

import getContentBySlug from "../../lib/getContentBySlug";
import getContentItem from "../../lib/getContentItem";
import getContentList from "../../lib/getContentList";
import { useI18n } from "../../lib/i18n";

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function Job({ content, job }) {
  const { t, language } = useI18n();
  const size = 55; // Size for share button

  if (!job) {
    return null;
  }

  return (
    <Layout
      title={job.title}
      description={job.summary}
      path={`${t("career.path")}`}
      translationPath={`${t("career.translationPath")}`}
      slugByLocale={job.slugByLocale}
    >
      <div className="mx-auto hidden max-w-screen-lg xl:sticky xl:top-4 xl:block">
        {/* > xl*/}
        <Share />
      </div>
      <Article body={job.body} title={job.title} />
      <div className="mx-auto max-w-screen-lg xl:hidden">
        {/* < xl */}
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
            employmentType: ["FULL_TIME", "PART_TIME"],
            hiringOrganization: {
              "@type": "Organization",
              name: "geOps",
              sameAs: "https://geops.com",
              logo: "https://geops.com/logo191.png",
            },
            jobLocation: [
              {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: ch.street,
                  addressLocality: ch.city,
                  postalCode: ch.postalCode.split("-")[1],
                  addressCountry: "CH",
                },
                latitude: ch.latitude,
                longitude: ch.longitude,
              },
              {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: de.street,
                  addressLocality: de.city,
                  postalCode: de.postalCode.split("-")[1],
                  addressCountry: "DE",
                },
                latitude: de.latitude,
                longitude: de.longitude,
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
