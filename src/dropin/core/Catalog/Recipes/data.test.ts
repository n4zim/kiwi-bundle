import { RecipeValidator } from "./data"
import { Recipe } from "./entity"

describe("src/core/Catalog/Recipes/data", () => {
  it("returns false when id is not a string", async () => {
    const recipe = new Recipe({
      id: null,
      name: "recipe_name",
      company: "company",
      authors: [],
      collections: [],
      sections: [],
      permissions: []
    } as any)

    const validationErrors = await RecipeValidator(recipe)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when name is not a name", async () => {
    const recipe = new Recipe({
      id: "recipe_id",
      name: null,
      company: "company",
      authors: [],
      collections: [],
      sections: [],
      permissions: []
    } as any)

    const validationErrors = await RecipeValidator(recipe)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when company is not a string", async () => {
    const recipe = new Recipe({
      id: "recipe_id",
      name: "name",
      company: null,
      authors: [],
      collections: [],
      sections: [],
      permissions: []
    } as any)

    const validationErrors = await RecipeValidator(recipe)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when authors is not a list", async () => {
    const recipe = new Recipe({
      id: "recipe_id",
      name: "name",
      company: "company",
      authors: null,
      collections: [],
      sections: [],
      permissions: []
    } as any)

    const validationErrors = await RecipeValidator(recipe)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when collections is not a list", async () => {
    const recipe = new Recipe({
      id: "recipe_id",
      name: "name",
      company: "company",
      authors: [],
      collections: null,
      sections: [],
      permissions: []
    } as any)

    const validationErrors = await RecipeValidator(recipe)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when sections is not a list", async () => {
    const recipe = new Recipe({
      id: "recipe_id",
      name: "name",
      company: "company",
      authors: [],
      collections: [],
      sections: null,
      permissions: []
    } as any)

    const validationErrors = await RecipeValidator(recipe)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when permissions is not a list", async () => {
    const recipe = new Recipe({
      id: "recipe_id",
      name: "name",
      company: "company",
      authors: [],
      collections: [],
      sections: [],
      permissions: null
    } as any)

    const validationErrors = await RecipeValidator(recipe)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns true when recipe is valid", async () => {
    const recipe = new Recipe({
      id: "recipe_id",
      name: "name",
      company: "company",
      authors: [],
      collections: [],
      sections: [],
      permissions: []
    } as any)

    const validationErrors = await RecipeValidator(recipe)

    expect(validationErrors.length).toStrictEqual(0)
  })
})
