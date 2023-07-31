import fs from "fs";
import { join } from "path";
import getContentItem from "./getContentItem.js";

export default function getContentList(language, options) {
  const { collections, fields, order, where } = options;
  const list = [];

  collections.forEach((collection) => {
    const collectionPath = join(process.cwd(), "content", collection);

    if (fs.existsSync(collectionPath) === false) {
      throw Error(`Content directory for collection ${collection} is missing.`);
    }

    return fs
      .readdirSync(collectionPath)
      .filter(
        (path) =>
          fs.lstatSync(join(collectionPath, path)).isDirectory() ||
          path.endsWith(".json") ||
          path.endsWith(".md"),
      )
      .map((path) => {
        fields.push(...Object.keys(where || {}));
        const item = getContentItem(language, collection, path, fields);
        if (where) {
          const [[field, condition]] = Object.entries(where);
          if (item[field] === condition) {
            list.push(item);
          }
        } else {
          list.push(item);
        }
      });
  });

  if (order) {
    const orderConditions = order.map((condition) => {
      const [[field, direction]] = Object.entries(condition);
      return { field, direction };
    });
    return list.sort((a, b) =>
      orderConditions.reduce((prev, { field, direction }) => {
        let result = 0;
        if (a[field] < b[field]) {
          result = -1;
        } else if (a[field] > b[field]) {
          result = 1;
        }

        if (prev === 1) {
          return 1;
        }
        return direction === "desc" ? result * -1 : result;
      }, 0),
    );
  }

  return list;
}
