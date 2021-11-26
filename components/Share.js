import { useRouter } from "next/router";
import GitHubIcon from "./icons/GitHubIcon.js";
import TwitterIcon from "./icons/TwitterIcon2.js";
import XingIcon from "./icons/XingIcon2.js";
import LinkedInIcon from "./icons/LinkedInIcon2.js";
import FacebookIcon from "./icons/FacebookIcon2.js";
import MailIcon from "./icons/MailIcon2.js";

const socialMedia = [
  {
    icon: <TwitterIcon className="w-full" />,
    href: "http://www.twitter.com/intent/tweet?url={url}&text={title}",
    title: "Twitter",
  },
  {
    icon: <LinkedInIcon className="w-full" />,
    href: "https://www.linkedin.com/sharing/share-offsite/?url={url}",
    title: "LinkedIn",
  },
  {
    icon: <FacebookIcon className="w-full" />,
    href: "http://www.facebook.com/sharer.php?u={url}&t={title}",
    title: "Facebbok",
  },
  {
    icon: <XingIcon className="w-full" />,
    href: "https://www.xing.com/spi/shares/new?url={url}",
    title: "Xing",
  },
  {
    icon: <MailIcon className="w-full" />,
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

export default function Share() {
  const router = useRouter();

  return (
    <ul className="relative xl:absolute flex flex-row xl:flex-col items-center xl:justify-center px-8 xl:px-0 xl:-mx-16 xl:mt-16 ">
      {socialMedia.map(({ icon, href, title }) => (
        <li
          key={title}
          className={`flex items-center justify-center text-gray-light hover:text-green`}
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
            className="px-3"
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
