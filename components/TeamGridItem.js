import Image from "next/image";

import { useI18n } from "../lib/i18n";
import UnknownPersonIcon from "./icons/UnknownPersonIcon.js";

export default function TeamGridItem({ person }) {
  const { language, t } = useI18n();
  return (
    <div className="aspect-h-4 aspect-w-3">
      <div className="absolute overflow-hidden rounded bg-gray-dark">
        {person.photo ? (
          <Image alt={person.name} fill src={person.photo} />
        ) : (
          <UnknownPersonIcon />
        )}
      </div>
      <div className="absolute left-0 right-0 h-full bg-gray-dark bg-opacity-80 p-8 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div className="absolute bottom-8">
          <strong>{person.name}</strong>
          <p>
            {person.position[language]}
            <br />
            {person.email && (
              <>
                <br />
                E-Mail:{" "}
                <a
                  className="text-green hover:text-green-light"
                  href={`mailto:${person.email}`}
                >
                  {person.email}
                </a>
              </>
            )}
            {person.telephone && (
              <>
                <br />
                {t("website.telephone")}:{" "}
                <a
                  className="text-green hover:text-green-light"
                  href={`tel:${person.telephone}`}
                >
                  {person.telephone}
                </a>
              </>
            )}
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
