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

export default function Share() {
  const router = useRouter();
  console.log(router);
  return (
    <div className="sticky bg-gray-lighter top-4 mx-auto  max-w-screen-lg mt">
      <ul
        className="absolute flex flex-col items-center justify-center -mx-16 mt-16 bg-gray-lighter text-gray-light"
        style={{ width: "55px" }}
      >
        {socialMedia.map(({ icon, href, title }) => (
          <li key={title} className="p-2 hover:text-green">
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
    </div>
  );
}
