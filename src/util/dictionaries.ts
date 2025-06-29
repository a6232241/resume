import "server-only";

const dictionaries = {
  en: () => import("@public/locales/en/index.json").then((module) => module.default),
  zh: () => import("@public/locales/zh/index.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "zh") => {
  const loader = dictionaries[locale];
  if (typeof loader !== "function") {
    throw new Error(`No dictionary loader found for locale: ${locale}`);
  }
  return loader();
};
