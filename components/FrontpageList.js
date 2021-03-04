import { useI18n } from "../lib/i18n";

import FrontpageListItem from "./FrontpageListItem.js";

export default function FrontpageList({ list }) {
  const { t } = useI18n();
  return (
    <div className="bg-gray-darker text-gray-lighter">
      <div className="container mx-auto px-8 pb-1">
        <h1 className="text-center pt-7 md:-mb-32">
          {t("frontpage.listTitle")}
        </h1>
        {list.map((item, index) => {
          const side = index % 2 === 0 ? "right" : "left";
          return <FrontpageListItem side={side} item={item} key={item.slug} />;
        })}
      </div>
    </div>
  );
}
