"use client";

import I18n from "../lib/i18n";
import useAnalytics from "../lib/useAnalytics";
import HtmlLang from "./HtmlLang";
import "../styles/index.css";

export default function Website({ children, lang }) {
  useAnalytics();
  return <I18n language={lang}>{children}</I18n>;
}
