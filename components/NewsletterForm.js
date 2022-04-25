import { createRef, useState } from "react";
import Button from "./Button.js";
import CheckmarkCircleIcon from "./icons/CheckmarkCircleIcon.js";
import MailCircleIcon from "./icons/MailCircleIcon.js";
import PointerCircleIcon from "./icons/PointerCircleIcon.js";
import { useI18n } from "../lib/i18n";

const newsletterFormEndpoint =
  "https://geops.us4.list-manage.com/subscribe/post-json?u=23161055bb6a407f7e6c00038&id=c9694280f7";

export default function NewsletterForm({ translations }) {
  const refHeader = createRef();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { language } = useI18n();

  const handleSubmit = async (event) => {
    event.preventDefault();
    refHeader.current.scrollIntoView({ behavior: "smooth" });
    await fetch(`${newsletterFormEndpoint}&EMAIL=${email}&c=?`, {
      mode: "no-cors",
    });
    setSubmitted(true);
  };

  return (
    <form
      className="container mx-auto max-w-screen-lg p-8"
      onSubmit={handleSubmit}
    >
      <h4 className="mb-10 text-center sm:text-left" ref={refHeader}>
        {submitted ? translations.submittedTitle : translations.subtitle}
      </h4>
      {submitted ? (
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between">
          <div className="w-48 text-center">
            <MailCircleIcon />
            <div className="my-4">{translations.submitted1}</div>
          </div>
          <div className="w-56 text-center">
            <PointerCircleIcon />
            <div className="my-4">{translations.submitted2}</div>
          </div>
          <div className="w-48 text-center">
            <CheckmarkCircleIcon />
            <div className="my-4">{translations.submitted3}</div>
          </div>
        </div>
      ) : (
        <>
          <label className="block">
            {translations.email}*
            <input
              autoCapitalize="off"
              autoCorrect="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="block h-14 w-full rounded border-2 border-gray-light focus:border-blue focus:ring-0"
              required
            />
          </label>
          <p className="text-gray-light">* {translations.required}</p>
          <label className="mt-8 inline-flex">
            <input
              type="checkbox"
              defaultChecked={false}
              className="mt-3 text-blue focus:ring-0"
              required
            />
            <span className="ml-4">{translations.privacy}</span>
          </label>
        </>
      )}
      <div className="py-16 text-center">
        {submitted ? (
          <Button href={language === "de" ? "/" : "/en"}>
            {translations.submittedButton}
          </Button>
        ) : (
          <Button type="submit">{translations.subscribe}</Button>
        )}
      </div>
    </form>
  );
}
