import "server-only";

const dictionaries = {
  en: () => import("@public/locales/en/index.json").then((module) => module.default),
  zh: () => import("@public/locales/zh/index.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (locale !== "en" && locale !== "zh") {
    throw new Error(`Unsupported locale: ${locale}. Only "en" and "zh" are supported.`);
  }
  const loader = dictionaries[locale as "en" | "zh"];
  if (typeof loader !== "function") {
    throw new Error(`No dictionary loader found for locale: ${locale}`);
  }
  return loader();
};
