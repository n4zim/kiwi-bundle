import { App, Language } from "kiwi-bundle"

export const APP = App(
  {
    key: "kiwibundle",
    navigation: {
      routes: {
        HOME: {
          path: "/",
          title: { en: "Home", fr: "Accueil" },
          header: {
            hideTitle: true,
          },
        },
      },
      prefixes: ["http://localhost:3000"],
    },
    appearance: {
      header: {
        hide: false,
        style: {
          backgroundColor: "grey",
        },
      },
      sizes: {
        font: 18,
        global_padding: 30,
      } as const,
      colors: {
        blue: "rgb(2, 68, 198)",
        black: "rgb(28, 28, 30)",
        grey: "rgb(229, 229, 231)",
      } as const,
    },
    i18n: {
      languages: [Language.FRENCH, Language.ENGLISH],
    },
    platforms: {
      web: {
        title: (page) => {
          let title = "Kiwi Bundle"
          if(typeof page !== "undefined") {
            title += " - " + page
          }
          return title
        },
        i18n: {
          urlQueryParam: "locale",
        },
      },
    },
  },
  {
    pages: {
      HOME: import("./pages/home"),
    },
  },
)
