import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is always defined, fallback to 'en' if undefined
  const currentLocale = locale || "en";

  return {
    locale: currentLocale,
    messages: (await import(`@public/locales/${currentLocale}/index.json`)).default,
  };
});
