import { useI18n } from "../lib/i18n";

import RelatedListItem from "./RelatedListItem.js";

export default function RelatedList({ dark, list }) {
  const { t } = useI18n();
  return list.length ? (
    <div
      className={dark ? "bg-gray-darker text-gray-lighter" : "bg-gray-lighter"}
    >
      <div className="container mx-auto px-8 py-16 max-w-screen-lg">
        <h2 className="text-center mb-16">{t("relatedList.title")}</h2>
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
