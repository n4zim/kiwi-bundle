import { v7rData } from "../../Formats/Models/v7r"
import { FieldType } from "../../Context/Types/FieldType"
import { TokenRecipe } from "./data"
import { v7r } from "../../Code/v7r"

export const v7rToken = v7rData({
  id: {
    name: "id",
    type: FieldType.TEXT,
    options: {
      required: true
    }
  },

  jwt: {
    name: "jwt",
    type: FieldType.TEXT,
    options: {
      required: true
    }
  },

  name: {
    name: { fr: "Nom", en: "Name" },
    type: FieldType.TEXT,
  },

  expiresAt: {
    name: "expiresAt",
    type: FieldType.DATE,
  },

  owner: {
    name: {
      one: { fr: "Propriétaire", en: "Owner" },
      many: { fr: "Propriétaires", en: "Owners" }
    },
    type: FieldType.COLLECTION,
    format: {

    }
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

export const TokenRecipeValidator = (data: TokenRecipe) => v7r<TokenRecipe>(data, {
  user: {
    name: "user",
    type: FieldType.TEXT,
    options: {
      required: true
    }
  },

  name: {
    name: "name",
    type: FieldType.TEXT,
    options: {
      required: false
    }
  }
})
