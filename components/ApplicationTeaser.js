import { useI18n } from "../lib/i18n";

import Teaser from "./Teaser";

export default function ApplicationTeaser() {
  const { t } = useI18n();
  return (
    <Teaser
      containerClassName="bg-application-teaser bg-cover"
      title={t("applicationTeaser.title")}
      subtitle={t("applicationTeaser.subtitle")}
      subtitleClassName="hidden md:block"
      action={t("applicationTeaser.action")}
      href="mailto:karriere@geops.de"
    />
  );
}
