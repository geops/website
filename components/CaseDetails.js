import { useI18n } from "../lib/i18n";

export function CaseDetails({ timeline, customer, service }) {
  const { t } = useI18n();
  return (
    <div className="text-gray-700 dark:text-gray-300 max-w-screen-sm mx-auto mt-32 mb-56">
      {customer && (
        <div>
          <h3>
            <strong>{t("cases.customer")}</strong>
          </h3>
          <span>{customer}</span>
        </div>
      )}
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
