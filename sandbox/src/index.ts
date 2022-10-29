import * as Kiwi from "./kiwi"

Kiwi.App({
  key: "kiwi_bundle_key",
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
})
