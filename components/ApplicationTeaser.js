import { useI18n } from "../lib/i18n";
import Button from "./Button";
import CaretIcon from "./icons/CaretIcon.js";
export default function ApplicationTeaser({ jobs }) {
  const { t } = useI18n();
  return (
    <section className="bg-application-teaser bg-cover" id="open-positions">
      <div className="container mx-auto flex flex-col items-center px-8 py-16 text-center">
        <h2 className="text-5xl">{t("applicationTeaser.title")}</h2>
        {jobs.map((job) => (
          <div className="my-16 max-w-xl" key={job.slug}>
            <h3>{job.title}</h3>
            <p
              className="mt-8"
              dangerouslySetInnerHTML={{ __html: job.summary }}
            />
            <p className="my-8">{t("applicationTeaser.text")}</p>
            <Button href={`${t("career.path")}/${job.slug}`}>
              {t("applicationTeaser.action")}
            </Button>
          </div>
        ))}
        <h2 className="mt-16">{t("applicationTeaser.altTitle")}</h2>
        <p className="mt-8 max-w-lg px-8 lg:px-6">
          {t("applicationTeaser.altText")}
        </p>
        <a
          className="text-shadow-white group mt-8 flex items-center font-bold text-green"
          href="mailto:karriere@geops.com"
        >
          {t("applicationTeaser.altAction")}
          <div className="ml-2 mt-1 w-6 transition duration-300 group-hover:translate-x-2">
            <CaretIcon direction="right" />
          </div>
        </a>
      </div>
    </section>
  );
}
