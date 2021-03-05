import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { useI18n } from "../lib/i18n";

import CaretIcon from "./icons/CaretIcon";
import CloseIcon from "./icons/CloseIcon";
import GeopsIcon from "./icons/GeopsIcon";
import MenuIcon from "./icons/MenuIcon";
import PlusIcon from "./icons/PlusIcon";
import WebsiteLink from "./Link";

import styles from "./Header.module.css";

export default function Header({ translationPath }) {
  const headerContainer = useRef(null);
  const placeholderRef = useRef(null);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const { language, t } = useI18n();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const height = entries[0].isIntersecting ? "112px" : "64px";
        headerContainer.current.style.setProperty("--header-height", height);
      },
      { threshold: 0 }
    );
    observer.observe(placeholderRef.current);
    return () => observer.disconnect();
  }, [headerContainer.current, placeholderRef.current]);

  const aboutMenu = [
    { href: "/about#we", title: t("about.we") },
    { href: "/about#work", title: t("about.work") },
    { href: "/about#tech", title: t("about.tech") },
    { href: "/about#team", title: "Team" },
  ];
  const menu = [
    { href: "/solution", title: t("solution.title") },
    { href: "/about", title: t("about.title") },
    { href: "/blog", title: "Blog" },
    { href: t("career.path"), title: t("career.title") },
  ].map((item) => ({ ...item, active: router.pathname.includes(item.href) }));

  return (
    <>
      <div className="h-16 lg:h-28" ref={placeholderRef} />
      <div className="fixed bg-white border-blue border-b-4 top-0 w-full z-30">
        <div
          className={`container mx-auto flex items-center justify-between h-16 transition-all ${styles.headerContainer}`}
          ref={headerContainer}
        >
          <WebsiteLink href="/">
            <a aria-label="geOps Logo" className="h-2/5 ml-8">
              <GeopsIcon className="h-full" />
            </a>
          </WebsiteLink>
          <button
            className="lg:hidden text-blue pr-8 w-16"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
          {/* -------- Mobile Navigation -------- */}
          <div
            className={`fixed inset-0 h-screen w-screen bg-gray-dark overflow-scroll lg:hidden transition-all ${
              menuOpen ? "opacity-100" : "left-32 opacity-0 pointer-events-none"
            }`}
          >
            <div className="container mx-auto flex flex-col h-full">
              <div className="flex-none flex items-center justify-between h-16">
                <WebsiteLink href="/">
                  <a className="h-1/2 ml-8">
                    <GeopsIcon className="h-full" white />
                  </a>
                </WebsiteLink>
                <button
                  className="text-green pr-8 w-16"
                  onClick={() => setMenuOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <ul className="divide-y divide-gray font-bold mt-8 mx-8 text-white text-2xl">
                  {menu.map((item) => (
                    <li className="relative" key={item.href}>
                      <WebsiteLink href={item.href}>
                        <a className="block py-4">{item.title}</a>
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
                                  <WebsiteLink href={aboutItem.href}>
                                    <a
                                      className="block py-4"
                                      onClick={() => setMenuOpen(false)}
                                    >
                                      {aboutItem.title}
                                      <div className="absolute right-0 top-4 w-8">
                                        <CaretIcon direction="bottom" />
                                      </div>
                                    </a>
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
                <div className="border-gray border-t mx-8 py-4 space-x-2 text-gray-light text-right">
                  {language === "de" ? (
                    <strong>DE</strong>
                  ) : (
                    <Link href={translationPath || "/"}>DE</Link>
                  )}
                  <span>|</span>
                  {language === "en" ? (
                    <strong>EN</strong>
                  ) : (
                    <Link href={`/en${translationPath || ""}`}>EN</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* -------- Desktop Navigation -------- */}
          <div className="hidden lg:flex h-full">
            <ul className="flex text-blue pr-4">
              {menu.map(({ active, href, title }) => (
                <li className="flex group relative" key={href}>
                  <WebsiteLink href={href}>
                    <a
                      className={`flex items-center px-8 mt-1 pb-1 ${
                        active ? "text-green-light border-b-4" : ""
                      }`}
                    >
                      {title}
                    </a>
                  </WebsiteLink>
                  {/* -------- Desktop About Navigation -------- */}
                  {href === "/about" && (
                    <ul
                      className={`${styles.aboutNavigation} absolute bg-white border-gray-lighter border divide-y divide-gray-lighter left-1/2 transform -translate-x-1/2 rounded-b hidden group-hover:block`}
                    >
                      {aboutMenu.map((aboutItem) => (
                        <li
                          className="relative whitespace-nowrap hover:bg-gray-lighter transition duration-300 ease-in-out"
                          key={aboutItem.href}
                        >
                          <WebsiteLink href={aboutItem.href}>
                            <a className="block px-6 py-4">{aboutItem.title}</a>
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
              <div className="border-gray-lighter border-l space-x-2 h-8 px-8 mb-1 text-gray">
                {language === "de" ? (
                  <strong>DE</strong>
                ) : (
                  <Link href={translationPath || "/"}>DE</Link>
                )}
                <span>|</span>
                {language === "en" ? (
                  <strong>EN</strong>
                ) : (
                  <Link href={`/en${translationPath || ""}`}>EN</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
