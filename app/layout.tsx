import React from "react";
import { i18n } from "../i18n-config";
import "./globals.css";

export async function generateMetadata() {
  return {
    title: {
      template: "%s | geOps",
      default: "geOps",
    },
  };
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "geOps",
              url: "https://geops.com",
              logo: "https://geops.com/logo191.png",
            }),
          }}
        ></script>
        {i18n.locales.map((locale) => {
          const rssBaseUrl = `https://geops.com${
            locale !== "de" ? `/${locale}` : ""
          }`;
          return (
            <React.Fragment key={locale}>
              <link
                rel="alternate"
                type="application/rss+xml"
                title="geOps Blog RSS Feed"
                hrefLang={locale}
                href={`${rssBaseUrl}/feed/rss.xml`}
              />
              <link
                rel="alternate"
                type="application/atom+xml"
                title="geOps Blog Atom Feed"
                hrefLang={locale}
                href={`${rssBaseUrl}/feed/atom.xml`}
              />
              <link
                rel="alternate"
                type="application/feed+json"
                title="geOps Blog JSON Feed"
                hrefLang={locale}
                href={`${rssBaseUrl}/feed/feed.json`}
              />
            </React.Fragment>
          );
        })}
        {children}
      </body>
    </html>
  );
}
