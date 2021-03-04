import fs from "fs";
import { join } from "path";

import getContentItem from "./getContentItem.js";

export default function getContentBySlug(language, collection, slug) {
  const collectionPath = join(process.cwd(), "content", collection);

  if (fs.existsSync(collectionPath) === false) {
    throw Error(`Content directory for collection ${collection} is missing.`);
  }

  try {
    fs.readdirSync(collectionPath).forEach((path) => {
      const item = getContentItem(language, collection, path);
      if (item.slug === slug) {
        throw item;
      }
    });
  } catch (item) {
    return item;
  }
}
