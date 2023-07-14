import Head from "next/head";
import React from "react";
import Website from "./website";

// export async function generateStaticParams() {
//   return i18n.locales.map((locale) => ({ lang: locale }));
// }

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  params: { lang = "de" },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <Head>
        {/* Import Lato font family from Typekit because open source version is missing font weights. */}
        <link href="https://use.typekit.net/not7ezq.css" rel="stylesheet" />
      </Head>
      <body>
        <Website lang={lang}>{children}</Website>
      </body>
    </html>
  );
}
