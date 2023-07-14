"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import I18n from "../lib/i18n";
import useAnalytics from "../lib/useAnalytics";
import HtmlLang from "../components/HtmlLang";
import "../styles/index.css";

export default function Website({ children, lang }) {
  useAnalytics();
  return (
    <I18n language={lang}>
      <HtmlLang />
      {children}
    </I18n>
  );
}
