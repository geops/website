import { useI18n } from "../lib/i18n";

import CaretIcon from "./icons/CaretIcon.js";
import Link from "./Link.js";

export default function RelatedListItem({ dark, item }) {
  const { t } = useI18n();
  return (
    <Link href={`/${item.collection}/${item.slug}`}>
      <a
        className="break-words group min-w-0"
        data-rank-age={item.rank.age}
        data-rank-col={item.rank.col}
        data-rank-tag={item.rank.tag}
      >
        {item.cover && (
          <div className="hidden lg:block aspect-w-4 aspect-h-3 mb-4 overflow-hidden rounded">
            <img
              alt={`${item.title} Cover`}
              className="object-cover transition duration-300 transform group-hover:scale-110"
              src={item.cover}
            />
          </div>
        )}
        <div className="text-gray">
          {item.readingTime} min {t("website.readingTime")} |{" "}
          {item.collection === "blog" ? "Blog" : t("relatedList.solution")}
        </div>
        <h2 className="mb-4 mt-2">{item.title}</h2>
        <p>{item.summary}</p>
        <div
          className={`flex items-center mt-4 ${
            dark ? "text-green" : "text-blue"
          }`}
        >
          <div>{t("website.readMore")}</div>
          <div className="w-6 ml-2 mt-1 transition duration-300 transform group-hover:translate-x-2">
            <CaretIcon direction="right" />
          </div>
        </div>
      </a>
    </Link>
  );
}
