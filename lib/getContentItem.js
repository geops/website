import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export default function getContentItem(language, collection, path, fields) {
  const itemPath = join(process.cwd(), "content", collection, path);

  if (fs.existsSync(itemPath) === false) {
    throw Error(`Item for content/${collection}/${path} is missing.`);
  }

  let data;
  if (fs.existsSync(join(itemPath, "index.de.md"))) {
    const content = {
      de: matter(fs.readFileSync(join(itemPath, "index.de.md"), "utf8")),
      en: matter(fs.readFileSync(join(itemPath, "index.en.md"), "utf8")),
    };
    data = { ...content["en"].data, ...content[language].data };
    data.body = content[language].content;
    if (data.slug) {
      data.translationSlug = content[language === "en" ? "de" : "en"].data.slug;
    }
  } else if (path.endsWith(".json")) {
    const content = JSON.parse(fs.readFileSync(itemPath, "utf8"));
    data = content[language]
      ? { ...content.en, ...content[language] }
      : content;
  }

  let item;
  if (fields) {
    item = { collection };
    fields.forEach((field) => {
      if (field === "readingTime") {
        item[field] = Math.ceil(readingTime(data.body).minutes);
      } else if (data[field]) {
        item[field] = data[field];
      }
    });
  } else {
    item = { ...data, collection };
  }

  if (item.created instanceof Date) {
    item.created = item.created.toJSON();
  }

  return item;
}
