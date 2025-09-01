"use client";

import Article from "./Article.js";
import { ch, de } from "./Contact.js";
import ContactPerson from "./ContactPerson.js";
import Layout from "./Layout.js";
import Share from "./Share.js";
import { useI18n } from "../lib/i18n.js";

export default function JobArticle({ content, job }) {
  const { t } = useI18n();

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
      <div className="mx-auto hidden max-w-screen-lg xl:sticky xl:top-4 xl:block">
        {/* > xl*/}
        <Share />
      </div>
      <Article body={job.body} title={job.title} imageSizes={job.imageSizes} />
      <div className="mx-auto max-w-screen-lg xl:hidden">
        {/* < xl */}
        <Share />
      </div>
      <ContactPerson
        person={content.contact}
        title={content.title}
        subtitle={content.subtitle}
      />
    </Layout>
  );
}
