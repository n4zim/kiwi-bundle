import { CollectionValidator } from "./data"
import { Collection } from "./entity"

describe("src/core/Storage/Collections/data", () => {
  it("returns false when id is not a string", async () => {
    const collection = new Collection({
      id: null,
      name: "name",
      fields: {}
    } as any)

    const validationErrors = await CollectionValidator(collection)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when name is not a string", async () => {
    const collection = new Collection({
      id: "collection_id",
      name: null,
      fields: {}
    } as any)

    const validationErrors = await CollectionValidator(collection)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns true when collection is valid", async () => {
    const collection = new Collection({
      id: "collection_id",
      name: "name",
      fields: {}
    } as any)

    const validationErrors = await CollectionValidator(collection)

    expect(validationErrors.length).toStrictEqual(0)
  })
})
