import { Group } from "./entity"
import { v7r } from "../../Code/v7r"
import { FieldType } from "../../Context/Types/FieldType"
import { GroupRecipe } from "./data"

export const GroupValidator = (data: Group) => v7r<Group>(data, {
  id: {
    name: "id",
    type: FieldType.TEXT,
    options: {
      required: true
    }
  },

  permissions: {
    name: "permissions",
    type: FieldType.LIST,
    options: {
      required: true
    }
  },

  users: {
    name: "users",
    type: FieldType.LIST,
    options: {
      required: true
    }
  }
}, [ "v7r", "group", "entity" ])


export const GroupRecipeValidator = (data: GroupRecipe) => v7r<GroupRecipe>(data, {
  id: {
    name: "id",
    type: FieldType.TEXT,
    options: {
      required: true
    }
  },

  permissions: {
    name: "permissions",
    type: FieldType.LIST,
    options: {
      required: true
    }
  },

  users: {
    name: "users",
    type: FieldType.LIST,
    options: {
      required: true
    }
  }
}, [ "v7r", "group", "recipe" ])
