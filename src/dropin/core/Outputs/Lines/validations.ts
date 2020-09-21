import { FieldType } from "../../Context/Types/FieldType"
import { LineData } from "./data"
import { v7r } from "../../Code/v7r"
import { Line } from "./entity"

export const LineValidator = (data: LineData|Line) => v7r<LineData|Line>(data, {
  id: {
    name: "id",
    type: FieldType.TEXT,
    options: {
      required: true
    }
  },

  recipe: {
    name: "recipe",
    type: FieldType.TEXT,
    options: {
      required: true
    }
  },

  recipeCollection: {
    name: "recipeCollection",
    type: FieldType.TEXT,
    options: {
      required: true
    }
  },

  data: {
    name: "data",
    type: FieldType.COLLECTION
  },

  version: {
    name: "version",
    type: FieldType.QUANTITY,
    options: {
      required: true
    }
  }
}, [ "v7r", "line", "entity" ])
