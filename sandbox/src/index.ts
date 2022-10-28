import * as Kiwi from "./kiwi"

Kiwi.App({
  key: "kiwibundle",
  navigation: {
    routes: {
      home: {
        path: "/",
        component: import("./pages/home"),
        title: { en: "Home", fr: "Accueil" },
      },
      test: {
        path: "/test",
        component: import("./pages/test"),
        title: "Test",
      },
    },
    prefixes: ["http://localhost:3000"],
  },
  i18n: {
    languages: [
      Kiwi.Language.ENGLISH,
      Kiwi.Language.FRENCH,
    ],
  },
  platforms: {
    web: {
      i18n: {
        urlQueryParam: "locale",
      },
      title: (page) => {
        let title = "Kiwi Bundle"
        if(typeof page !== "undefined") {
          title += " - " + page
        }
        return title
      },
    },
  },
})
