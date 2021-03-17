import { useI18n } from "../lib/i18n";

import UnknownPersonIcon from "./icons/UnknownPersonIcon.js";

export default function TeamGridItem({ person }) {
  const { language, t } = useI18n();
  return (
    <div className="aspect-w-3 aspect-h-4">
      <div className="absolute bg-gray-dark rounded overflow-hidden">
        {person.photo ? (
          <img alt={person.name} src={person.photo} />
        ) : (
          <UnknownPersonIcon />
        )}
      </div>
      <div className="absolute bg-gray-dark bg-opacity-80 text-white left-0 right-0 h-full p-8 transition-opacity duration-300 opacity-0 hover:opacity-100">
        <div className="absolute bottom-8">
          <strong>{person.name}</strong>
          <p>
            {person.position[language]}
            <br />
            <br />
            E-Mail:{" "}
            <a
              className="text-green hover:text-green-light"
              href={`mailto:${person.email}`}
            >
              {person.email}
            </a>
            <br />
            {t("website.telephone")}:{" "}
            <a
              className="text-green hover:text-green-light"
              href={`tel:${person.telephone}`}
            >
              {person.telephone}
            </a>
            {person.github && (
              <>
                <br />
                GitHub:{" "}
                <a
                  className="text-green hover:text-green-light"
                  href={`https://github.com/${person.github}`}
                  target="external"
                >
                  {person.github}
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
