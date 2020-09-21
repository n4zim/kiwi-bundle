import { GroupValidator } from "./data"
import { Group } from "./entity"

describe("src/core/Auth/Groups/data", () => {
  it("returns false when id is not a string", async () => {
    const group = new Group({
      id: null,
      users: [],
      permissions: []
    } as any)

    const validationErrors = await GroupValidator(group)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when users is not a list", async () => {
    const group = new Group({
      id: "id",
      users: null,
      permissions: []
    } as any)

    const validationErrors = await GroupValidator(group)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when permissions is not a list", async () => {
    const group = new Group({
      id: "id",
      users: [],
      permissions: null
    } as any)

    const validationErrors = await GroupValidator(group)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns", async () => {
    const group = new Group({
      id: "id",
      users: [],
      permissions: []
    })

    const validationErrors = await GroupValidator(group)

    expect(validationErrors.length).toStrictEqual(0)
  })
})
