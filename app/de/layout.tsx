import React from "react";
import Website from "../../components/Website";
import { i18n } from "../../i18n-config";

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
  const lang = "de";
  return (
    <html lang={lang}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
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
            <>
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
            </>
          );
        })}

        {/* Import Lato font family from Typekit because open source version is missing font weights. */}
        <link href="https://use.typekit.net/not7ezq.css" rel="stylesheet" />
      </head>
      <body>
        <Website lang={lang}>{children}</Website>
      </body>
    </html>
  );
}
