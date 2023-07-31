import dynamic from "next/dynamic";

import Image from "next/image";

import { useI18n } from "../lib/i18n";

import Circle from "./Circle.js";
import aboutImage from "../public/images/page/about/geops-about-text1.jpg";
import about2Image from "../public/images/page/about/geops-about-text2.jpg";
import Markdown from "markdown-to-jsx";

const TechnologyCarousel = dynamic(() => import("./TechnologyCarousel"), {
  ssr: false,
});

export default function AboutContent({ content, technologies }) {
  const { t } = useI18n();
  return (
    <div className="prose prose-xl mx-auto max-w-screen-lg p-8">
      <h2 id="we">{t("about.we")}</h2>
      <p>
        <Markdown>{content.we1}</Markdown>
      </p>
      <p>
        <Markdown>{content.we2}</Markdown>
      </p>
      <p>
        <Markdown>{content.we3}</Markdown>
      </p>
      <p>
        <Markdown>{content.we4}</Markdown>
      </p>
      <p>
        <Markdown>{content.we5}</Markdown>
      </p>
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
      <p>
        <Markdown>{content.work}</Markdown>
      </p>
      <Image alt={t("about.work")} src={aboutImage} />
      <h2 id="tech">{t("about.tech")}</h2>
      <p>
        <Markdown>{content.tech}</Markdown>
      </p>
      <TechnologyCarousel slides={technologies} />
      <h2 id="sustainability">{t("about.sustainability")}</h2>
      <p>
        <Markdown>{content.sustainability}</Markdown>
      </p>
      <Image alt={t("about.sustainability")} src={about2Image} />
    </div>
  );
}
