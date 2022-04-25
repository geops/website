import Teaser from "./Teaser";
import { useI18n } from "../lib/i18n";

export default function NewsletterTeaser() {
  const { t } = useI18n();
  return (
    <Teaser
      title={t("newsletterTeaser.title")}
      subtitle={t("newsletterTeaser.subtitle")}
      action={t("newsletterTeaser.action")}
      href="/newsletter"
    />
  );
}
