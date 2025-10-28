import { useI18n } from "../lib/i18n";

export function CaseDetails({ timeline, service }) {
  const { t } = useI18n();
  return (
    <div className="text-gray-700 my-8 grid gap-8 md:grid-cols-2">
      {service && (
        <div>
          <h3>
            <strong>{t("cases.service")}</strong>
          </h3>
          <span>{service}</span>
        </div>
      )}
      {timeline && (
        <div>
          <h3>
            <strong>{t("cases.timeline")}</strong>
          </h3>
          <span>{timeline}</span>
        </div>
      )}
    </div>
  );
}
