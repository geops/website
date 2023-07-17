"use client";

import { useEffect } from "react";

import { useI18n } from "../lib/i18n";

export default function HtmlLang() {
  const { language } = useI18n();
  console.log(language);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  return null;
}
