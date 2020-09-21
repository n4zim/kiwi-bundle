import { FieldType } from "../../Context/Types/FieldType"
import { Permission } from "./entity"
import { v7r } from "../../Code/v7r"
import { PermissionRecipe } from "./data"

export const PermissionValidator = (data: Permission) => v7r<Permission>(data, {
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

  collections: {
    name: "collections",
    type: FieldType.COLLECTION
  }
}, [ "v7r", "permission", "entity" ])


export const PermissionRecipeValidator = (data: PermissionRecipe) => v7r<PermissionRecipe>(data, {
  name: {
    name: "name",
    type: FieldType.NAME,
    options: {
      required: true
    }
  },

  slug: {
    name: "slug",
    type: FieldType.TEXT,
    options: {
      required: true
    }
  },

  collections: {
    name: "collections",
    type: FieldType.LIST,
    options: {
      required: true
    }
  }
}, [ "v7r", "permission", "recipe" ])
