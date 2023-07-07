import Image from "next/image";

import { useI18n } from "../lib/i18n";
import CaretIcon from "./icons/CaretIcon.js";
import Link from "./Link.js";
export default function RelatedListItem({ dark, item }) {
  const { t } = useI18n();
  return (
    <Link
      href={`/${item.collection}/${item.slug}`}
      className="group min-w-0 break-words"
      data-rank-age={item.rank.age}
      data-rank-tag={item.rank.tag}
    >
      {item.cover && (
        <div className="aspect-h-3 aspect-w-4 mb-4 hidden overflow-hidden rounded lg:block">
          <Image
            alt={`${item.title} Cover`}
            className="object-cover transition duration-300 group-hover:scale-110"
            layout="fill"
            src={item.cover}
          />
        </div>
      )}
      <div className="text-gray">
        {item.readingTime} min {t("website.readingTime")} |{" "}
        {item.collection === "blog" ? "Blog" : t("relatedList.solution")}
      </div>
      <h3 className="mb-4 mt-2">{item.title}</h3>
      <p>{item.summary}</p>
      <div
        className={`mt-4 flex items-center ${
          dark ? "text-green" : "text-blue"
        }`}
      >
        <div>{t("website.readMore")}</div>
        <div className="ml-2 mt-1 w-6 transition duration-300 group-hover:translate-x-2">
          <CaretIcon direction="right" />
        </div>
      </div>
    </Link>
  );
}
