import { useI18n } from "../lib/i18n";
import TeamGridItem from "../components/TeamGridItem.js";
export default function TeamGrid({ team }) {
  const { t } = useI18n();
  return (
    <section className="bg-gray-darker text-gray-light">
      <div className="container mx-auto p-8 pb-16">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-center mt-24 text-5xl" id="team">
            {t("team.title")}
          </h2>
          <p className="mb-32 mt-8">{t("team.text")}</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {team.map((person) => (
            <TeamGridItem key={person.name} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
