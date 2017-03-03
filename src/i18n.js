import i18n from 'i18next';

i18n.init({
  fallbackLng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',
  debug: true,
  // backend: {
  //   loadPath: "locales/{{lng}}/{{ns}}.json"
  // }
  resources: {
    en: {
      translation: {
        "RaidInfo": {
          "time": "Time!",
          "loc": "Location!",
          "type": "Type!",
          "desc": "Description ! ",
          "ver": "Verified !!!"
        }
      }
    }
  }
});

export default i18n;
