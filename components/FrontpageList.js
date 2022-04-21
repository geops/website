import { useI18n } from "../lib/i18n";
import FrontpageListItem from "./FrontpageListItem.js";

export default function FrontpageList({ items }) {
  const { t } = useI18n();
  return (
    <div className="bg-gray-darker text-gray-lighter">
      <div className="container mx-auto px-8 py-16 md:pb-24 space-y-32 md:space-y-48 xl:space-y-64">
        <h2 className="-mb-16 text-center text-5xl">
          {t("frontpage.listTitle")}
        </h2>
        {items.map((item, index) => {
          const side = index % 2 === 0 ? "right" : "left";
          return <FrontpageListItem side={side} item={item} key={item.slug} />;
        })}
      </div>
    </div>
  );
}
