import translations from "./translations";

export const locale = navigator.language.substring(0, 2)

function translate(key) {
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no translation for key "${key}"`);

  let text = translations[locale] && translations[locale][key];

  if (!text) return key

  return text;
}

export const t = (key) => translate(key)
