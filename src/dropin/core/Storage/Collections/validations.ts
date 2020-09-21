import { CollectionRecipe } from "./data"
import { v7r } from "../../Code/v7r"
import { FieldType } from "../../Context/Types/FieldType"
import { Collection } from "./entity"

export const CollectionRecipeValidator = (data: CollectionRecipe) => v7r<CollectionRecipe>(data, {
  name: {
    name: "name",
    type: FieldType.NAME,
    options: {
      required: true
    }
  }
}, [ "v7r", "collection", "recipe" ])


export const CollectionValidator = (data: Collection) => v7r<Collection>(data, {
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

  fields: {
    name: "fields",
    type: FieldType.COLLECTION
  }
}, [ "v7r", "collection", "entity" ])
