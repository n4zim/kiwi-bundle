import { v7rData } from "../../Formats/Models/v7r"
import { v7r } from "../../Code/v7r"
import { FieldType } from "../../Context/Types/FieldType"
import { UserRecipe } from "./data"

export const v7rUser = v7rData({
  id: { name: "id", type: FieldType.TEXT, options: { required: true } },
  name: {
    name: {
      one: { fr: "Nom", en: "Name" },
      many: { fr: "Noms", en: "Names" }
    },
    type: FieldType.NAME,
    options: { required: true }
  },
  emails: {
    name: {
      one: { fr: "Adresse e-mail", en: "Email address" },
      many: { fr: "Adresses e-mail", en: "Email adresses" }
    },
    type: FieldType.LIST, options: {
      type: FieldType.EMAIL,
      required: true
    }
  },
  password: {
    name: {
      one: { fr: "Mot de passe", en: "Password" },
      many: { fr: "Mots de passe", en: "Passwords" }
    },
    type: FieldType.TEXT, options: { required: true }
  },
  short: {
    name: {
      one: { fr: "Nom court", en: "Short name" },
      many: { fr: "Noms courts", en: "Short names" }
    },
    type: FieldType.TEXT
  },
  public: {
    name: { fr: "Profil en accès public", en: "Public accessible profile" },
    type: FieldType.BOOLEAN
  },
  realms: {
    name: { many: { fr: "Royaumes", en: "Realms" } },
    type: FieldType.OBJECT,
    format: {
      "*": {
        type: FieldType.OBJECT,
        format: {
          "*": {
            type: FieldType.TEXT,
          },
        },
      },
    },
  },
  createdAt: {
    name: {
      one: {fr: "Date de création", en: "Creation date"},
      many: {fr: "Dates de création", en: "Creation dates"}
    },
    type: FieldType.DATE,
    options: { required: true }
  },
  updatedAt: {
    name: {
      one: {fr: "Date de modification", en: "Modification date"},
      many: {fr: "Dates de modification", en: "Modification dates"}
    },
    type: FieldType.DATE,
    options: { required: true }
  }
})

export const UserRecipeValidator = (data: UserRecipe) => v7r<UserRecipe>(data, {
  name: {
    name: "name",
    type: FieldType.NAME,
    options: {
      required: true
    }
  },

  emails: {
    name: "emails",
    type: FieldType.LIST,
    options: {
      required: true
    }
  },

  password: {
    name: "password",
    type: FieldType.TEXT,
    options: {
      required: true
    }
  }
}, [ "v7r", "user", "recipe" ])
