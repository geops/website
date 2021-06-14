import { useI18n } from "../lib/i18n";

import CaretIcon from "./icons/CaretIcon.js";
import GitHubIcon from "./icons/GitHubIcon.js";
import TwitterIcon from "./icons/TwitterIcon.js";
import XingIcon from "./icons/XingIcon.js";
import LinkedInIcon from "./icons/LinkedInIcon.js";

const socialMedia = [
  {
    icon: <GitHubIcon />,
    href: "https://github.com/geops",
    title: "GitHub",
  },
  {
    icon: <TwitterIcon />,
    href: "https://twitter.com/geops",
    title: "Twitter",
  },
  {
    icon: <XingIcon />,
    href: "https://www.xing.com/companies/geops",
    title: "Xing",
  },
  {
    icon: <LinkedInIcon />,
    href: "https://www.linkedin.com/company/geops/",
    title: "LinkedIn",
  },
];

export const ch = {
  email: "info@geops.ch",
  telephone: "+41 61 588 05 05",
  street: "Solothurnerstrasse 235",
  city: "Olten",
  postalCode: "CH-4600",
};

export const de = {
  email: "info@geops.de",
  telephone: "+49 761 458 925 0",
  street: "Bismarckallee 10",
  city: "Freiburg",
  postalCode: "D-79098",
};

export default function Contact() {
  const { t } = useI18n();
  const goTop = () => window.scroll({ top: 0, behavior: "smooth" });
  return (
    <div className="bg-gray-dark text-gray-light relative">
      <button
        aria-label={t("website.up")}
        onClick={goTop}
        className="absolute top-4 right-4 w-16 outline-none"
      >
        <CaretIcon direction="top" />
      </button>
      <div className="container mx-auto px-8 py-16 md:py-24 md:flex justify-between">
        <h2 className="text-4xl font-bold">{t("contact.title")}</h2>
        <div className="mt-8 md:mt-0">
          <strong>geOps AG</strong> <br />
          {ch.street}
          <br />
          {ch.postalCode} {ch.city}
          <br />
          <br />
          fon:{" "}
          <a className="hover:text-green" href={`tel:${ch.telephone}`}>
            {ch.telephone}
          </a>
          <br />
          mail:{" "}
          <a className="hover:text-green" href={`mailto:${ch.email}`}>
            {ch.email}
          </a>
        </div>
        <div className="mt-8 md:mt-0">
          <strong>geOps GmbH</strong> <br />
          {de.street}
          <br />
          {de.postalCode} {de.city}
          <br />
          <br />
          fon:{" "}
          <a className="hover:text-green" href={`tel:${de.telephone}`}>
            {de.telephone}
          </a>
          <br />
          mail:{" "}
          <a className="hover:text-green" href={`mailto:${de.email}`}>
            {de.email}
          </a>
        </div>
        <div className="mt-8 md:mt-0 xl:pr-32">
          <ul>
            {socialMedia.map(({ icon, href, title }) => (
              <li key={title}>
                <a
                  className="flex items-center space-x-2 hover:text-green"
                  href={href}
                  target="external"
                >
                  {icon} <span>{title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
