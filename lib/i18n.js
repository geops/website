import { createContext, useContext, useState, useRef, useEffect } from "react";
import rosetta from "rosetta";

import translations from "../content/page/translations.json";

const I18nContext = createContext();
const i18n = rosetta();

i18n.set("de", translations.de);
i18n.set("en", translations.en);

export function useI18n() {
  return useContext(I18nContext);
}

export default function I18n({ children, language }) {
  const activeLanguageRef = useRef(language);
  const [, setTick] = useState(0);
  const firstRender = useRef(true);

  const i18nWrapper = {
    language: activeLanguageRef.current,
    t: (...args) => i18n.t(...args),
    locale: (newLanguage) => {
      i18n.locale(newLanguage);
      activeLanguageRef.current = newLanguage;
      // force rerender to update view
      setTick((tick) => tick + 1);
    },
  };

  // for initial SSR render
  if (firstRender.current === true) {
    firstRender.current = false;
    i18nWrapper.locale(language);
  }

  // when language is updated
  useEffect(() => {
    i18nWrapper.locale(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <I18nContext.Provider value={i18nWrapper}>{children}</I18nContext.Provider>
  );
}
