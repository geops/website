import { useEffect } from "react";
import { useI18n } from "../lib/i18n";

export default function NewsletterForm({ translations }) {
  const { language } = useI18n();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "eu1",
          portalId: "143209811",
          formId:
            language === "de"
              ? "6d86cf62-264e-49bc-a950-f94fa84e2a8e"
              : "e9d6a25f-86d6-4a7b-997f-fce926dfbb18",
          target: "#hubspotForm",
        });
      }
    });
  }, [language]);

  return (
    <div id="hubspotForm" className="container mx-auto max-w-screen-lg p-8">
      {translations.loading}
    </div>
  );
}
