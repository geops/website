import "@testing-library/jest-dom/extend-expect";

global.solutions = [
  {
    collection: "solution",
    imageSizes: {
      "/images/solution/maps/aarau_buslinien.png": {
        height: 604,
        width: 960,
        type: "png",
      },
      "/images/solution/maps/map_raster.png": {
        height: 1227,
        width: 1920,
        type: "png",
      },
      "/images/solution/maps/geops_ablauf_grafik_02.png": {
        height: 811,
        width: 1443,
        type: "png",
      },
      "/images/solution/maps/map_raster_mobile.png": {
        height: 1858,
        width: 1267,
        type: "png",
      },
      "/images/solution/maps/geops_ablauf_grafik_02_mobile.png": {
        height: 1219,
        width: 741,
        type: "png",
      },
      "/images/solution/maps/maps.png": {
        height: 530,
        width: 612,
        type: "png",
      },
    },
    color: "#1789C9",
    gridImage: "/images/solution/maps/maps.png",
    summary: "Karten für Mobilität und öffentlichen Verkehr.",
    slug: "maps",
    title: "Maps",
    weight: 1,
  },
  {
    collection: "solution",
    imageSizes: {
      "/images/solution/routing/routing_960.png": {
        height: 638,
        width: 960,
        type: "png",
      },
      "/images/solution/routing/routingscreenshot.jpg": {
        height: 1533,
        width: 3584,
        type: "jpg",
      },
      "/images/solution/routing/routing.png": {
        height: 826,
        width: 754,
        type: "png",
      },
    },
    color: "#549413",
    gridImage: "/images/solution/routing/routing.png",
    summary:
      "Mit unserem Routing-Dienst finden Sie die Wege und Linien­­verläufe für Fahrzeuge des öffentlichen Ver­kehrs, für PKW und LKW sowie für Fuss­gänger.",
    slug: "routing",
    title: "Routing",
    weight: 2,
  },
  {
    collection: "solution",
    imageSizes: {
      "/images/solution/webkarten-und-bahnhofplaene/webkartenportal.png": {
        height: 523,
        width: 374,
        type: "png",
      },
      "/images/solution/webkarten-und-bahnhofplaene/bahnhofplan.png": {
        height: 519,
        width: 371,
        type: "png",
      },
    },
    color: "#353535",
    summary:
      "Einheitliche Karten und Bahnhof­pläne für den gesamten öffentlichen Verkehr in der Schweiz.",
    slug: "webkarten-und-bahnhofplaene",
    title: "Karten und Bahnhofpläne der SBB",
    weight: 3,
  },
  {
    collection: "solution",
    imageSizes: {
      "/images/solution/tralis-livemap/tracker_worldwide_960.png": {
        height: 638,
        width: 960,
        type: "png",
      },
      "/images/solution/tralis-livemap/livemap_s-bahn_muenchen.png": {
        height: 446,
        width: 960,
        type: "png",
      },
      "/images/solution/tralis-livemap/livemap_960_02.png": {
        height: 571,
        width: 960,
        type: "png",
      },
    },
    color: "#4B6881",
    summary:
      "Live Maps zeigen die Positionen von Fahrzeugen des öffent­lichen Verkehrs auf einer Karte. Neben der Karten­darstellung entstehen mit der Ver­arbeitung der Fahrzeug­positionen präzise Prognosen für Reisende.",
    slug: "livemap",
    title: "Live Maps",
    weight: 4,
  },
  {
    collection: "solution",
    imageSizes: {
      "/images/solution/umwelt-software/grafik_bg_weis.png": {
        height: 903,
        width: 1177,
        type: "png",
      },
      "/images/solution/umwelt-software/tree_app.png": {
        height: 691,
        width: 960,
        type: "png",
      },
      "/images/solution/umwelt-software/treeapp.png": {
        height: 796,
        width: 600,
        type: "png",
      },
    },
    color: "#1A6A70",
    gridImage: "/images/solution/umwelt-software/treeapp.png",
    summary:
      "Bei unserer Umweltsoftware stehen Interoperabilität, Lang­lebigkeit und Nutzer­freundlich­keit im Fokus. ",
    slug: "umwelt-software",
    title: "Software für die Umwelt",
    weight: 5,
  },
  {
    collection: "solution",
    imageSizes: {
      "/images/solution/cartaro/iabp_mask.png": {
        height: 1080,
        width: 1920,
        type: "png",
      },
      "/images/solution/cartaro/iabp_mask_mobil.png": {
        height: 1071,
        width: 1662,
        type: "png",
      },
    },
    color: "#C8716A",
    summary:
      "Mit Cartaro bieten wir ein Content Management System, mit dem räumliche Daten verwaltet und publiziert werden können.",
    slug: "cartaro",
    title: "Cartaro",
    weight: 6,
  },
  {
    collection: "solution",
    imageSizes: {},
    color: "white",
    summary:
      "Unser Developer Portal bietet einen Baukasten aus Web­diensten und Open Source Software für Ihre Anwendung.",
    slug: "developer-portal",
    title: "Developer Portal",
    weight: 7,
  },
  {
    collection: "solution",
    imageSizes: {
      "/images/solution/disruption-information/moco_screen_960.png": {
        height: 638,
        width: 960,
        type: "png",
      },
      "/images/solution/disruption-information/s-bahn-muenchen_s1.png": {
        height: 1080,
        width: 1920,
        type: "png",
      },
      "/images/solution/disruption-information/s-bahn_muenchen_mobil_s1.png": {
        height: 800,
        width: 960,
        type: "png",
      },
      "/images/solution/disruption-information/baustellenkommunikation.png": {
        height: 1030,
        width: 1060,
        type: "png",
      },
    },
    color: "#353535",
    gridImage:
      "/images/solution/disruption-information/baustellenkommunikation.png",
    summary:
      "Wenn im öffentlichen Verkehr nicht alles rund läuft, ist eine schnelle und transparente Information der Reisenden entscheidend.\n",
    slug: "disruption-information",
    title: "Störfall- und Baustellen­kommuni­kation",
    weight: 8,
  },
  {
    collection: "solution",
    imageSizes: {
      "/images/solution/mapset/mapset_mobil.png": {
        height: 681,
        width: 1024,
        type: "png",
      },
      "/images/solution/mapset/liestal_plan_editor_k.png": {
        height: 966,
        width: 1500,
        type: "png",
      },
      "/images/solution/mapset/mapset_cover.png": {
        height: 504,
        width: 600,
        type: "png",
      },
      "/images/solution/mapset/Mapset_Logo.svg": {
        height: 64,
        width: 222,
        type: "svg",
      },
    },
    color: "#1789C9",
    gridImage: "/images/solution/mapset/mapset_cover.png",
    logo: "/images/solution/mapset/Mapset_Logo.svg",
    summary:
      "mapset erlaubt die einfache Erstellung von übersichtlichen und optisch ans­prechenden Plänen für Belange des öffentlichen Verkehrs.",
    slug: "mapset",
    title: "Pläne zum Selbermachen",
    weight: 9,
  },
  {
    collection: "solution",
    imageSizes: {
      "/images/solution/network-plans/liniennetz_01.png": {
        height: 956,
        width: 1924,
        type: "png",
      },
      "/images/solution/network-plans/LNP_mobile.png": {
        height: 957,
        width: 964,
        type: "png",
      },
      "/images/solution/network-plans/lnp_grid_cover.png": {
        height: 603,
        width: 491,
        type: "png",
      },
    },
    color: "white",
    gridImage: "/images/solution/network-plans/lnp_grid_cover.png",
    summary:
      "Liniennetzpläne bieten schnell verständliche Übersichten des öV-Angebots. Unsere Netzpläne werden automatisiert auf Basis des Fahrplans oder vergleichbarer Datenquellen generiert.",
    slug: "netzplaene",
    title: "Liniennetzpläne",
    weight: 10,
  },
  {
    collection: "solution",
    imageSizes: {
      "/images/solution/transit-data-hub/sbb.jpg": {
        height: 1080,
        width: 1920,
        type: "jpg",
      },
      "/images/solution/transit-data-hub/maps-4-.jpg": {
        height: 789,
        width: 640,
        type: "jpg",
      },
    },
    color: "#549413",
    summary:
      "Datenintegrator und Daten­lieferant, Analyse-Topf, Konverter – die Daten­dreh­scheibe ist Basis für diese und mehr Funktionen ",
    slug: "transit-data-hub",
    title: "Drehscheibe für Fahrplan- und Echtzeitdaten",
    weight: 10,
  },
];
