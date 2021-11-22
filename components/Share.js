import { useI18n } from "../lib/i18n";
import { useRouter } from "next/router";
import CaretIcon from "./icons/CaretIcon.js";
import GitHubIcon from "./icons/GitHubIcon.js";
import TwitterIcon from "./icons/TwitterIcon.js";
import XingIcon from "./icons/XingIcon.js";
import LinkedInIcon from "./icons/LinkedInIcon.js";
import FacebookIcon from "./icons/FacebookIcon.js";
import MailIcon from "./icons/MailIcon.js";

const socialMedia = [
  {
    icon: <TwitterIcon />,
    href: "http://www.twitter.com/intent/tweet?url={url}&text={title}",
    title: "Twitter",
  },
  {
    icon: <LinkedInIcon />,
    href: "https://www.linkedin.com/sharing/share-offsite/?url={url}",
    title: "LinkedIn",
  },
  {
    icon: <FacebookIcon />,
    href: "http://www.facebook.com/sharer.php?u={url}&t={title}",
    title: "Facebbok",
  },
  {
    icon: <XingIcon />,
    href: "https://www.xing.com/spi/shares/new?url={url}",
    title: "Xing",
  },
  {
    icon: <MailIcon />,
    href: "mailto:?body={url}",
    title: "Mail",
  },
];

const onClick = (href) => {
  window.open(
    href
      .replace("{url}", encodeURIComponent(window.location.href))
      .replace("{title}", encodeURIComponent(document.title)),
    "_blank"
  );
};
const size = 40; // Size for share button
const classNameLi =
  "flex items-center justify-center xl:bg-gray-lighter text-gray-light";

export default function Share() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <ul className="relative xl:absolute flex flex-row xl:flex-col items-center xl:justify-center px-8 xl:px-0 xl:-mx-16 xl:mt-16 ">
      <li
        className={`${classNameLi} xl:hidden font-bold mr-2`}
        style={{ height: size }}
      >
        {t("share.title")}
      </li>
      {socialMedia.map(({ icon, href, title }) => (
        <li
          key={title}
          className={`${classNameLi} hover:text-green`}
          style={{
            minWidth: size,
            maxWidth: size,
            width: size,
            minHeight: size,
            maxHeight: size,
            height: size,
          }}
        >
          <a
            title={title}
            href=""
            target="external"
            onClick={(evt) => {
              onClick(href);
              evt.preventDefault();
            }}
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
