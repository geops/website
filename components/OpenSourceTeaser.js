import { useI18n } from "../lib/i18n";

import Teaser from "./Teaser";

export default function OpenSourceTeaser() {
  const { t } = useI18n();
  return (
    <Teaser
      title={t("openSourceTeaser.title")}
      text={t("openSourceTeaser.text")}
      action={t("openSourceTeaser.action")}
      href="/about"
    />
  );
}
