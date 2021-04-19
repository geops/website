import { useI18n } from "../lib/i18n";

import Teaser from "./Teaser";

export default function CareerTeaser() {
  const { t } = useI18n();
  return (
    <Teaser
      containerClassName="bg-career-teaser bg-cover"
      subtitleClassName="hidden md:block"
      title={t("careerTeaser.title")}
      subtitle={t("careerTeaser.subtitle")}
      action={t("careerTeaser.action")}
      href={t("career.path")}
    />
  );
}
