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
      .replace(
        "{url}",
        encodeURIComponent(
          "https://website-git-olivier-share-geops.vercel.app/"
          // window.location.href
        )
      )
      .replace("{title}", encodeURIComponent(document.title)),
    "_blank"
  );
};

export default function Share() {
  const router = useRouter();
  console.log(router);
  const width = 40;
  const height = 40;
  return (
    <ul className="relative xl:absolute flex flex-row xl:flex-col items-center justify-center xl:-mx-16 xl:mt-16 ">
      {socialMedia.map(({ icon, href, title }) => (
        <li
          key={title}
          className="flex items-center justify-center xl:bg-gray-lighter text-gray-light hover:text-green "
          style={{
            minWidth: width,
            maxWidth: width,
            width: width,
            minHeight: height,
            maxHeight: height,
            height: height,
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
