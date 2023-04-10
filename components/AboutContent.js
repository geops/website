import Image from "next/image";

import { useI18n } from "../lib/i18n";

import Circle from "./Circle.js";
import aboutImage from "../public/images/page/about/text.jpg";

const TechnologyCarousel = dynamic(
  () => import("./TechnologyCarousel"),
  { ssr: false }
);

export default function AboutContent({ content }) {
  const { t } = useI18n();
  return (
    <div className="prose prose-xl mx-auto max-w-screen-lg p-8">
      <h2 id="we">{t("about.we")}</h2>
      <p>{content.we1}</p>
      <p>{content.we2}</p>
      <p>{content.we3}</p>
      <p>{content.we4}</p>
      <p>{content.we5}</p>
      <div className="my-32 flex flex-col flex-wrap content-center justify-center space-y-8 lg:flex-row lg:justify-between lg:space-y-0">
        <Circle delay="300">
          <div className="text-6xl">{content.circleCounter.year}</div>
          <div className="mt-4 text-3xl">
            {content.circleYears}
            <br />
            {content.circleExperience}
          </div>
        </Circle>
        <Circle delay="500">
          <div className="text-6xl">{content.circleCounter.client}</div>
          <div className="mt-4 text-3xl">{content.circleClients}</div>
        </Circle>
        <Circle delay="700">
          <div className="text-6xl">{content.circleCounter.employee}</div>
          <div className="mt-4 text-3xl">{content.circleEmployee}</div>
        </Circle>
      </div>
      <h2 id="work">{t("about.work")}</h2>
      <p>{content.work}</p>
      <Image alt={t("about.work")} className="py-16" src={aboutImage} />
      <h2 id="tech">{t("about.tech")}</h2>
      <p>{content.tech}</p>
      <TechnologyCarousel slides={technologies} />
      <h2 id="sustainability">{t("about.sustainability")}</h2>
      <p>{content.sustainability}</p>
    </div>
  );
}
