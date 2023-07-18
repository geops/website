import translations from "../content/page/translations.json";
import rosetta from "rosetta";

export async function generateGenericMetadata(props) {
  const { language, title, description, shareImg, path } = props;
  const i18n = rosetta();
  i18n.set(language, translations[language]);
  i18n.locale(language);

  // From Layout component
  const baseUrl = `https://geops.com${language === "en" ? "/en" : ""}`;
  const titl = (title && i18n.t(title)) || title || undefined;
  const descr =
    (description &&
      i18n.t(description) &&
      i18n.t(description).replace("/&shy;/g", "")) ||
    description ||
    undefined;
  const image = shareImg || "/logo191.png";

  let enPath = language === "en" ? path : path.replace("/de", "/en");
  let dePath = language === "de" ? path : path.replace("/en", "/de");

  const md = {
    //   generator: 'Next.js',
    applicationName: "geops.com",
    // referrer: 'origin-when-cross-origin',
    // keywords: ['Next.js', 'React', 'JavaScript'],
    // authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
    // colorScheme: 'dark',
    // creator: 'Jiachi Liu',
    // publisher: 'Sebastian Markbåge',
    // formatDetection: {
    //   email: false,
    //   address: false,
    //   telephone: false,
    // },
    metadataBase: new URL("https://geops.com"),
    alternates: {
      canonical: path,
      languages: {
        en: enPath,
        de: dePath || "/",
      },
    },
    openGraph: {
      title: titl,
      description: descr,
      url: path,
      siteName: "geops.com",
      images: image,
      locale: language,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titl,
      description: descr,
      site: "@geOps",
      creator: "@geOps",
      images: [image],
    },
  };

  if (titl) {
    md.title = titl;
  }

  if (descr) {
    md.description = descr;
  }

  return md;
}

export default generateGenericMetadata;
