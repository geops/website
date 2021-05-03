import { Feed } from "feed";
import fs from "fs";

import translations from "../content/page/translations.json";

const feedBaseUrl = "https://geops.de";

export default function generateFeeds(list, language) {
  const lngPath = language === "en" ? "/en" : "";

  const feed = new Feed({
    title: "geOps Blog",
    description: translations[language].aboutTeaser.title,
    id: feedBaseUrl,
    link: feedBaseUrl,
    language,
    favicon: `${feedBaseUrl}/favicon.ico`,
    updated: new Date(),
    feedLinks: {
      rss2: `${feedBaseUrl}${lngPath}/feed/rss.xml`,
      json: `${feedBaseUrl}${lngPath}/feed/feed.json`,
      atom: `${feedBaseUrl}${lngPath}/feed/atom.xml`,
    },
  });

  list.forEach((item) => {
    feed.addItem({
      title: item.title,
      id: `${feedBaseUrl}${lngPath}/blog/${item.slug}`,
      link: `${feedBaseUrl}${lngPath}/blog/${item.slug}`,
      description: item.summary,
      date: new Date(item.created),
    });
  });

  fs.mkdirSync(`./public${lngPath}/feed`, { recursive: true });
  fs.writeFileSync(`./public${lngPath}/feed/rss.xml`, feed.rss2());
  fs.writeFileSync(`./public${lngPath}/feed/atom.xml`, feed.atom1());
  fs.writeFileSync(`./public${lngPath}/feed/feed.json`, feed.json1());
}
