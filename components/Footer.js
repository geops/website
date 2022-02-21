import { useI18n } from "../lib/i18n";

import Link from "./Link.js";

export default function Footer() {
  const { t } = useI18n();
  return (
    <div className="relative bg-gray-darker">
      <div className="container mx-auto px-8 py-4 text-gray-light">
        <Link href={t("imprint.path")}>
          <a className="hover:text-green">{t("imprint.title")}</a>
        </Link>{" "}
        |{" "}
        <Link href={t("privacy.path")}>
          <a className="hover:text-green">{t("privacy.title")}</a>
        </Link>
      </div>
    </div>
  );
}
