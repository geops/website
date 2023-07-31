"use client";

import Article from "./Article.js";
import Layout from "./Layout.js";
import RelatedList from "./RelatedList.js";
import Share from "./Share.js";

export default function BlogArticle({ item, related }) {
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
