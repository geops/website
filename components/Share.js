import LinkedInIcon from "./icons/LinkedInIcon2.js";
import MailIcon from "./icons/MailIcon2.js";

const socialMedia = [
  {
    icon: <LinkedInIcon className="w-full" />,
    href: "https://www.linkedin.com/sharing/share-offsite/?url={url}",
    title: "LinkedIn",
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
    "_blank",
  );
};
const size = 40; // Size for share button

export default function Share() {
  return (
    <ul className="relative flex flex-row items-center px-8 xl:absolute xl:-mx-16 xl:mt-16 xl:flex-col xl:justify-center xl:px-0 ">
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
