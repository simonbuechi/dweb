import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import transDe from "./de.json";
import transEn from "./en.json";
import { initReactI18next } from "react-i18next";


i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  //.use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to the react-i18next components.
  // Alternative use the I18nextProvider: https://react.i18next.com/components/i18nextprovider
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    supportedLngs: ["en", "de"],
    lng: "en",
    fallbackLng: "en",
    cleanCode: true,
    lowerCaseLng: true,
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    keySeparator: ".",
    resources: {
      en: { translation: transEn },
      de: { translation: transDe }
    }
  });

export default i18n;
