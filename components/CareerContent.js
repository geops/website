import { useI18n } from "../lib/i18n";

import CheckmarkCircleIcon from "./icons/CheckmarkCircleIcon.js";
import PageHeader from "./PageHeader.js";

export default function CareerContent({ content }) {
  const { t } = useI18n();
  return (
    <div>
      <PageHeader
        src="/images/career-page.jpg"
        title={t("career.title")}
        text={content.headerText}
      />
      <div className="mx-auto p-8 prose prose-xl max-w-screen-lg">
        <h2>{content.summaryTitle}</h2>
        <p className="pb-16">{content.summary}</p>
        <h2 className="pb-4">{content.offerTitle}</h2>
        <div className="my-24 flex flex-wrap justify-center lg:justify-between">
          <div className="w-52 text-center">
            <CheckmarkCircleIcon delay="100" />
            <div className="my-4">{content.offerEducation}</div>
          </div>
          <div className="w-52 text-center">
            <CheckmarkCircleIcon delay="300" />
            <div className="my-4">{content.offerFlexible}</div>
          </div>
          <div className="w-52 text-center">
            <CheckmarkCircleIcon delay="500" />
            <div className="my-4">{content.offerAdditon}</div>
          </div>
          <div className="w-52 text-center">
            <CheckmarkCircleIcon delay="700" />
            <div className="my-4">{content.offerFreiburg}</div>
          </div>
        </div>
        <h2>{content.matchTitle}</h2>
        <div dangerouslySetInnerHTML={{ __html: content.matchText }} />
      </div>
    </div>
  );
}
