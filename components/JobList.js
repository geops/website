import { useI18n } from "../lib/i18n";

import Button from "./Button";

export default function JobList({ jobs }) {
  const { t } = useI18n();
  return (
    <div className="bg-gray-lighter mt-32">
      <div className="max-w-screen-lg mx-auto px-8 py-32">
        <h1 className="text-center mb-16">{t("jobList.title")}</h1>
        <div className="divide-y-2 divide-gray-light">
          {jobs.map((job) => (
            <div
              className="flex flex-wrap justify-between font-bold content-center mt-4 pb-4"
              key={job.slug}
            >
              <div className="self-center">{job.title}</div>{" "}
              <Button href={`${t("career.path")}/${job.slug}`}>
                {t("jobList.action")}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
