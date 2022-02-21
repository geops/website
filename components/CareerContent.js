import Markdown from "markdown-to-jsx";

import { useI18n } from "../lib/i18n";
import namedCodesToUnicode from "../lib/namedCodesToUnicode";

import CheckmarkCircleIcon from "./icons/CheckmarkCircleIcon.js";

export default function CareerContent({ content }) {
  const { t } = useI18n();
  return (
    <div className="prose prose-xl mx-auto max-w-screen-lg p-8">
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
      <Markdown options={{ namedCodesToUnicode }}>{content.matchText}</Markdown>
    </div>
  );
}
