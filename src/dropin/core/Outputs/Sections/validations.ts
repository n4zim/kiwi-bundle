import { Section } from "./entity"
import { v7r } from "../../Code/v7r"
import { FieldType } from "../../Context/Types/FieldType"
import { SectionResponse, SectionRecipe } from "./data"

export const SectionValidator = (data: SectionResponse|Section) => v7r<SectionResponse|Section>(data, {
  id: {
    name: "id",
    type: FieldType.TEXT,
    options: {
      required: true
    }
  },

  name: {
    name: "name",
    type: FieldType.NAME,
    options: {
      required: true
    }
  },

  list: {
    name: "list",
    type: FieldType.COLLECTION,
  },

  children: {
    name: "children",
    type: FieldType.LIST,
    options: {
      required: true
    }
  }
}, [ "v7r", "section", "entity" ])


export const SectionRecipeValidator = (data: SectionRecipe) => v7r<SectionRecipe>(data, {
  // name: { type: "name", options: { required: true } },
  // administrators: { type: "list", options: {} },
}, [ "v7r", "section", "recipe" ])
