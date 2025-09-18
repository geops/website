import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useI18n } from "../lib/i18n";

import CaretIcon from "./icons/CaretIcon";
import CloseIcon from "./icons/CloseIcon";
import GeopsIcon from "./icons/GeopsIcon";
import MenuIcon from "./icons/MenuIcon";
import PlusIcon from "./icons/PlusIcon";
import WebsiteLink from "./Link";

import styles from "./Header.module.css";

export default function Header({ pathByLocale }) {
  const headerContainer = useRef(null);
  const placeholderRef = useRef(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const { language, t } = useI18n();

  console.log(pathByLocale);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const height = entries[0].isIntersecting ? "112px" : "64px";
        headerContainer.current?.style.setProperty("--header-height", height);
      },
      { threshold: 0 },
    );
    observer.observe(placeholderRef.current);
    return () => observer.disconnect();
  }, []);

  const aboutMenu = [
    { href: "/about#we", title: t("about.we") },
    { href: "/about#work", title: t("about.work") },
    { href: "/about#tech", title: t("about.tech") },
    { href: "/about#sustainability", title: t("about.sustainability") },
    { href: "/about#partnership", title: t("about.partnership") },
    { href: "/about#team", title: "Team" },
  ];
  const menu = [
    { href: "/solution", title: t("solution.title") },
    { href: "/cases", title: t("cases.title") },
    { href: "/about", title: t("about.title") },
    { href: "/blog", title: "Blog" },
    { href: t("career.path"), title: t("career.title") },
  ].map((item) => ({ ...item, active: pathname.includes(item.href) }));

  return (
    <>
      <div className="h-16 lg:h-28" ref={placeholderRef} />
      <div className="fixed top-0 z-30 w-full border-b-4 border-blue bg-white">
        <div
          className={`container mx-auto flex h-16 items-center justify-between transition-all ${styles.headerContainer}`}
          ref={headerContainer}
        >
          <WebsiteLink
            href="/"
            data-cy="headerLogo"
            aria-label="geOps Logo"
            className="ml-8 h-2/5"
          >
            <GeopsIcon className="h-full" />
          </WebsiteLink>
          <button
            data-cy="menuButton"
            className="w-16 pr-8 text-blue lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
          {/* -------- Mobile Navigation -------- */}
          <div
            data-cy="menuListMobile"
            className={`fixed inset-0 h-full w-screen overflow-scroll bg-gray-dark transition-all duration-500 lg:hidden ${
              menuOpen ? "opacity-100" : "pointer-events-none left-32 opacity-0"
            }`}
          >
            <div className="container mx-auto flex h-full flex-col">
              <div className="flex h-16 flex-none items-center justify-between">
                <WebsiteLink
                  href={"/"}
                  className="ml-8 h-1/2"
                  onClick={() => setMenuOpen(false)}
                >
                  <GeopsIcon className="h-full" white />
                </WebsiteLink>
                <button
                  className="w-16 pr-8 text-green"
                  onClick={() => setMenuOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="flex flex-grow flex-col justify-between">
                <ul className="mx-8 mt-8 divide-y divide-gray text-2xl font-bold text-white">
                  {menu.map((item) => (
                    <li className="relative" key={item.href}>
                      <WebsiteLink
                        href={item.href}
                        className="block py-4"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.title}
                      </WebsiteLink>
                      {/* -------- Mobile About Navigation -------- */}
                      {item.href === "/about" && (
                        <>
                          <button
                            className={`absolute right-0 top-4 w-8 ${
                              aboutMenuOpen && "text-green"
                            }`}
                            onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
                          >
                            {aboutMenuOpen ? <CloseIcon /> : <PlusIcon />}
                          </button>
                          {aboutMenuOpen && (
                            <ul className="ml-8">
                              {aboutMenu.map((aboutItem) => (
                                <li className="relative" key={aboutItem.href}>
                                  <WebsiteLink
                                    href={aboutItem.href}
                                    className="block py-4"
                                    onClick={() => setMenuOpen(false)}
                                  >
                                    {aboutItem.title}
                                    <div className="absolute right-0 top-4 w-8">
                                      <CaretIcon direction="bottom" />
                                    </div>
                                  </WebsiteLink>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                {/* -------- Mobile Translation Navigation -------- */}
                <div className="mx-8 space-x-2 border-t border-gray py-4 text-right text-gray-light">
                  {language === "de" ? (
                    <strong>DE</strong>
                  ) : (
                    <Link href={pathByLocale.de} data-cy="deLinkMobile">
                      DE
                    </Link>
                  )}
                  <span>|</span>
                  {language === "en" ? (
                    <strong>EN</strong>
                  ) : (
                    <Link href={pathByLocale.en} data-cy="enLinkMobile">
                      EN
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* -------- Desktop Navigation -------- */}
          <div data-cy="menuListDesktop" className="hidden h-full lg:flex">
            <ul className="flex pr-4 text-blue">
              {menu.map(({ active, href, title }) => (
                <li className="group relative flex" key={href}>
                  <WebsiteLink
                    href={href}
                    className={`mt-1 flex items-center px-8 pb-1 ${
                      active ? "border-b-4 text-green-light" : ""
                    }`}
                  >
                    {title}
                  </WebsiteLink>
                  {/* -------- Desktop About Navigation -------- */}
                  {href === "/about" && (
                    <ul
                      className={`${styles.aboutNavigation} absolute left-1/2 hidden -translate-x-1/2 divide-y divide-gray-lighter rounded-b border border-gray-lighter bg-white group-hover:block`}
                    >
                      {aboutMenu.map((aboutItem) => (
                        <li
                          className="relative whitespace-nowrap transition duration-300 ease-in-out hover:bg-gray-lighter"
                          key={aboutItem.href}
                        >
                          <WebsiteLink
                            href={aboutItem.href}
                            className="block px-6 py-4"
                          >
                            {aboutItem.title}
                          </WebsiteLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            {/* -------- Desktop Translation Navigation -------- */}
            <div className="flex items-center">
              <div className="mb-1 h-8 space-x-2 border-l border-gray-lighter px-8 text-gray">
                {language === "de" ? (
                  <strong>DE</strong>
                ) : (
                  <Link href={pathByLocale.de} data-cy="deLinkDesktop">
                    DE
                  </Link>
                )}
                <span>|</span>
                {language === "en" ? (
                  <strong>EN</strong>
                ) : (
                  <Link href={pathByLocale.en} data-cy="enLinkDesktop">
                    EN
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
