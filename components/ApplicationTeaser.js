import { useI18n } from "../lib/i18n";
import Button from "./Button";
import CaretIcon from "./icons/CaretIcon.js";
export default function ApplicationTeaser({ jobs }) {
  const { t } = useI18n();
  return (
    <section className="bg-application-teaser bg-cover">
      <div className="container mx-auto px-8 py-16 text-center flex flex-col items-center">
        <h2 className="text-5xl">{t("applicationTeaser.title")}</h2>
        {jobs.map((job) => (
          <div className="max-w-xl my-16" key={job.slug}>
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
        <p className="px-8 lg:px-6 max-w-lg mt-8">
          {t("applicationTeaser.altText")}
        </p>
        <a
          className="group flex items-center font-bold text-green mt-8 text-shadow-white"
          href="mailto:karriere@geops.de"
        >
          {t("applicationTeaser.altAction")}
          <div className="w-6 ml-2 mt-1 transition duration-300 transform group-hover:translate-x-2">
            <CaretIcon direction="right" />
          </div>
        </a>
      </div>
    </section>
  );
}
