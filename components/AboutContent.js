import { useI18n } from "../lib/i18n";

import Circle from "./Circle.js";
import GitHubIcon from "./icons/GitHubIcon.js";
import HTML5Icon from "./icons/HTML5Icon.js";
import JavaScriptIcon from "./icons/JavaScriptIcon.js";
import OpenLayersIcon from "./icons/OpenLayersIcon.js";
import PythonIcon from "./icons/PythonIcon.js";
import ReactIcon from "./icons/ReactIcon.js";
import RedisIcon from "./icons/RedisIcon.js";
import TechnologieCarousel from "../components/TechnologieCarousel.js";

export default function AboutContent({ content }) {
  const { t } = useI18n();
  return (
    <div className="mx-auto p-8 prose prose-xl max-w-screen-lg">
      <h2 id="we">{t("about.we")}</h2>
      <p>{content.we1}</p>
      <p>{content.we2}</p>
      <p>{content.we3}</p>
      <p>{content.we4}</p>
      <p>{content.we5}</p>
      <div className="flex flex-wrap flex-col content-center justify-center my-32 space-y-8 lg:flex-row lg:justify-between lg:space-y-0">
        <Circle delay="300">
          <div className="text-6xl">{content.circleCounter.year}</div>
          <div className="text-3xl mt-4">
            {content.circleYears}
            <br />
            {content.circleExperience}
          </div>
        </Circle>
        <Circle delay="500">
          <div className="text-6xl">{content.circleCounter.client}</div>
          <div className="text-3xl mt-4">{content.circleClients}</div>
        </Circle>
        <Circle delay="700">
          <div className="text-6xl">{content.circleCounter.employee}</div>
          <div className="text-3xl mt-4">{content.circleEmployee}</div>
        </Circle>
      </div>
      <h2 id="work">{t("about.work")}</h2>
      <p>{content.work}</p>
      <img
        alt={t("about.work")}
        className="py-16"
        src="/images/page/about/text.jpg"
      />
      <h2 id="tech">{t("about.tech")}</h2>
      <p>{content.tech}</p>
    </div>
  );
}
