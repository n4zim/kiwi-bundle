import { v7rData } from "../../Formats/Models/v7r"
import { v7r } from "../../Code/v7r"
import { FieldType } from "../../Context/Types/FieldType"
import { CompanyRecipe } from "./data"

export const v7rCompany = v7rData({
  id: { name: "id", type: FieldType.TEXT, options: { required: true } },
  name: {
    name: {
      one: { fr: "Nom", en: "Name" },
      many: { fr: "Noms", en: "Names" }
    },
    type: FieldType.NAME,
    options: { required: true }
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

export const CompanyRecipeValidator = (data: CompanyRecipe) => v7r<CompanyRecipe>(data, {
  name: { type: "name", options: { required: true } },
  // administrators: { type: "list", options: {} },
}, [ "v7r", "company", "recipe" ])
