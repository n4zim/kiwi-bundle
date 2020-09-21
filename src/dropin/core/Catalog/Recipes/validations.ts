import { Recipe } from "./entity"
import { v7r } from "../../Code"
import { RecipeResponse, RecipeRecipe } from "./data"
import { FieldType } from "../../Context/Types/FieldType"

export const RecipeValidator = (data: RecipeResponse|Recipe) => v7r<RecipeResponse|Recipe>(data, {
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

  company: {
    name: "company",
    type: FieldType.TEXT,
    options: {
      required: false
    }
  },

  authors: {
    name: "authors",
    type: FieldType.LIST,
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
  },

  sections: {
    name: "sections",
    type: FieldType.LIST,
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
}, [ "v7r", "recipe", "entity" ])


export const RecipeRecipeValidator = (data: RecipeRecipe) => v7r<RecipeRecipe>(data, {
  slug: {
    name: "slug",
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

  company: {
    name: "company",
    type: FieldType.TEXT,
    options: {
      required: false
    }
  },

  authors: {
    name: "authors",
    type: FieldType.LIST,
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
  },

  sections: {
    name: "sections",
    type: FieldType.LIST,
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
  }
}, [ "v7r", "recipe", "recipe" ])
