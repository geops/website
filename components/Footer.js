import { useI18n } from "../lib/i18n";

import Link from "./Link.js";

export default function Footer() {
  const { t } = useI18n();
  return (
    <div className="bg-gray-darker relative">
      <div className="container mx-auto p-4 text-gray-light">
        <Link href={t("imprint.path")}>{t("imprint.title")}</Link> |{" "}
        <Link href={t("privacy.path")}>{t("privacy.title")}</Link>
      </div>
    </div>
  );
}
