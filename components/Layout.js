import { useRouter } from "next/navigation";
import Contact from "./Contact.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import { useI18n } from "../lib/i18n";
import Website from "./Website.js";

export default function Layout({
  children,
  description,
  title,
  shareImg,
  path,
  translationPath,
  slugByLocale,
  ...props
}) {
  const { language } = useI18n();

  // if current language is DE
  let enPath =
    "/en" + (translationPath || path || "") + (slugByLocale?.en || "");
  let dePath = "/de" + (path || "") + (slugByLocale?.de || "");

  // if current language is EN
  if (language === "en") {
    enPath = "/en" + (path || "") + (slugByLocale?.en || "");
    dePath =
      "/de" + (translationPath || path || "/") + (slugByLocale?.de || "");
  }

  return (
    <>
      <Header pathByLocale={{ de: dePath, en: enPath }} />
      {children}
      <Contact />
      <Footer />
    </>
  );
}
