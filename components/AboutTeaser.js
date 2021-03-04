import { useI18n } from "../lib/i18n";

import Teaser from "./Teaser";

export default function AboutTeaser() {
  const { t } = useI18n();
  return (
    <div className="bg-gray-darker">
      <Teaser
        containerClassName="bg-white max-w-screen-xl xl:rounded mx-auto relative -top-20"
        title={t("aboutTeaser.title")}
        text={t("aboutTeaser.text")}
        action={t("website.more")}
        href="/about"
      />
    </div>
  );
}
