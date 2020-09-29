import { LineValidator } from "./data"
import { Line } from "./entity"

describe("src/core/Storage/Lines/data", () => {
  it("returns false when id is not a string", async () => {
    const line = new Line({
      id: null,
      recipe: "recipe",
      recipeCollection: "recipe_collection",
      data: {},
      version: 1
    } as any)

    const validationErrors = await LineValidator(line)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when recipe is not a string", async () => {
    const line = new Line({
      id: "line_id",
      recipe: null,
      recipeCollection: "recipe_collection",
      data: {},
      version: 1
    } as any)

    const validationErrors = await LineValidator(line)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when recipe collection is not a string", async () => {
    const line = new Line({
      id: "line_id",
      recipe: "recipe",
      recipeCollection: null,
      data: {},
      version: 1
    } as any)

    const validationErrors = await LineValidator(line)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when version is not a number", async () => {
    const line = new Line({
      id: "line_id",
      recipe: "recipe",
      recipeCollection: "recipe_collecion",
      data: {},
      version: null
    } as any)

    const validationErrors = await LineValidator(line)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns true when line is valid", async () => {
    const line = new Line({
      id: "line_id",
      recipe: "recipe",
      recipeCollection: "recipe_collecion",
      data: {},
      version: 1
    } as any)

    const validationErrors = await LineValidator(line)

    expect(validationErrors.length).toStrictEqual(0)
  })
})
