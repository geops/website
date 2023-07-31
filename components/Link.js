import Link from "next/link";
import { useI18n } from "../lib/i18n";

export default function WebsiteLink({ children, href, ...props }) {
  const { language } = useI18n();
  return (
    <Link href={`${language === "en" ? "/en" : ""}${href}`} {...props}>
      {children}
    </Link>
  );
}
