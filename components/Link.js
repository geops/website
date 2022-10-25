import Link from "next/link";
import { useI18n } from "../lib/i18n";

export default function WebsiteLink({ children, href }) {
  const { language } = useI18n();
  console.log("WebsiteLink", href);
  return (
    <Link href={`${language === "en" ? "/en" : ""}${href}`}>{children}</Link>
  );
}
