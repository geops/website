import { useI18n } from "../lib/i18n";
import Button from "./Button";

export default function AboutTeaser() {
  const { t } = useI18n();
  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <section className="relative -top-24 mx-4 max-w-2xl rounded bg-white lg:-top-36 lg:ml-8 lg:-mb-24">
          <div className="p-4 lg:p-8">
            <h1 className="text-2xl lg:text-5xl">{t("aboutTeaser.title")}</h1>
            <p className="my-4 lg:my-8">{t("aboutTeaser.text")}</p>
            <Button href="/about">{t("website.more")}</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
