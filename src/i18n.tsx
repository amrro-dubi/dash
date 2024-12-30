// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import translationAR from "./locals/ar.json";
import translationEN from "./locals/en.json";

// The translations
const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};
const getLanguageFromLocalStorage = () => {
  const savedLanguage = window.localStorage.getItem("language");
  // document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
  return savedLanguage ? savedLanguage : "en"; // Fallback to 'en' if not found
};
i18n.use(initReactI18next).init({
  resources,
  lng: getLanguageFromLocalStorage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;    