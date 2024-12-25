export const defaultLang = "tr";

export const languages = {
  tr: "Turkish",
  en: "English",
};

export const ui = {
  tr: {},
  en: {},
} as const;

export function getLangFromUrl(url?: URL) {
  if (url) {
    const [, lang] = url.pathname.split("/");
    if (lang && Object.hasOwnProperty.call(ui, lang)) {
      return lang as keyof typeof ui;
    }
  }
  return defaultLang;
}
