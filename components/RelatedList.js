import { useI18n } from "../lib/i18n";

import RelatedListItem from "./RelatedListItem.js";

export default function RelatedList({ dark, list }) {
  const { t } = useI18n();
  return list.length ? (
    <div
      className={dark ? "bg-gray-darker text-gray-lighter" : "bg-gray-lighter"}
    >
      <div className="container mx-auto max-w-screen-lg px-8 py-16">
        <span className="mb-16 inline-block w-full text-center text-3xl font-bold">
          {t("relatedList.title")}
        </span>
        <div className="grid gap-16 lg:grid-cols-2">
          {list.map((item) => {
            const key = `${item.collection}/${item.slug}`;
            return <RelatedListItem dark={dark} item={item} key={key} />;
          })}
        </div>
      </div>
    </div>
  ) : null;
}
