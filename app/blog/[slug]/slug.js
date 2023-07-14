"use client";

import Article from "../../../components/Article.js";
import Layout from "../../../components/Layout.js";
import RelatedList from "../../../components/RelatedList.js";
import Share from "../../../components/Share.js";
import Head from "next/head.js";

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function BlogArticle({ item, related, ...props }) {
  if (!item) {
    return null;
  }

  return (
    <Layout
      title={item.title}
      description={item.summary}
      path={"/blog"}
      translationPath={"/blog"}
      slugByLocale={item.slugByLocale}
      shareImg={item.cover}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: item.title,
              image: [item.cover],
              datePublished: item.created,
              author: [
                {
                  "@type": "Organisation",
                  name: "geOps",
                  url: "https://geops.com",
                },
                {
                  "@type": "Person",
                  name: item.author,
                },
              ],
            }),
          }}
        />
      </Head>
      <div className="mx-auto hidden max-w-screen-lg xl:sticky xl:top-4 xl:block">
        {/* > xl*/}
        <Share />
      </div>
      <Article
        author={item.author}
        body={item.body}
        created={item.created}
        imageSizes={item.imageSizes}
        title={item.title}
      />
      <div className="mx-auto mb-16 max-w-screen-lg xl:hidden">
        {/* < xl*/}
        <Share />
      </div>
      <RelatedList list={related} />
    </Layout>
  );
}
