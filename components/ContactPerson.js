import Markdown from "markdown-to-jsx";
import Image from "next/image";

import { useI18n } from "../lib/i18n";
import namedCodesToUnicode from "../lib/namedCodesToUnicode";
const arrowDown = {
  borderLeft: "32px solid transparent",
  borderRight: "32px solid transparent",
  borderTopWidth: "32px",
};
export default function ContactPerson({ person, subtitle, title }) {
  const { language, t } = useI18n();
  const subtitleClassName = subtitle
    ? "prose prose-2xl text-gray-darker mx-auto my-8 font-regular link-text-green"
    : "prose prose-2xl text-gray-darker mx-auto mt-2 font-bold w-2/3";
  return (
    <section className="container mx-auto mb-16 mt-16 max-w-screen-lg lg:mb-24 lg:mt-24">
      <div
        className={`m-8 mb-0 flex-row-reverse justify-center bg-gray-lighter p-8 text-center md:flex ${
          person.photo && "md:text-left"
        }`}
      >
        <div>
          <h2 className="text-4xl md:text-5xl">
            {title || t("contactPerson.title")}
          </h2>
          {subtitle ? (
            <div className={subtitleClassName}>
              <Markdown options={{ namedCodesToUnicode, forceBlock: true }}>
                {subtitle}
              </Markdown>
            </div>
          ) : (
            <h2 className="mt-4 text-2xl">{t("contactPerson.subtitle")}</h2>
          )}
          <p className="my-4 md:mb-0">
            {person.name && (
              <>
                <strong>{person.name}</strong>
                <br />
              </>
            )}
            {person.position && (
              <>
                {person.position[language]}
                <br />
              </>
            )}
            E-Mail:{" "}
            <a className="text-green" href={`mailto:${person.email}`}>
              {person.email}
            </a>
            <br />
            {t("website.telephone")}:{" "}
            <a className="text-green" href={`tel:${person.telephone}`}>
              {person.telephone}
            </a>
          </p>
        </div>
        {person.photo && (
          <Image
            alt={`${person.name} portrait`}
            className="mx-auto h-64 w-64 self-center rounded-full object-cover object-top md:mr-20 md:ml-0"
            layout="fill"
            src={person.photo}
          />
        )}
      </div>
      <div
        className="relative mx-auto h-0 w-0 border-gray-lighter"
        style={arrowDown}
      />
    </section>
  );
}
