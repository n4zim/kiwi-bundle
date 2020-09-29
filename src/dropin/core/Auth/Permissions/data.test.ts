import { PermissionValidator } from "./validations"
import { Permission } from "./entity"

describe("src/core/Auth/Permissions/data", () => {
  it("returns false when id is not a string", async () => {
    const permission = new Permission({
      id: null,
      name: "name",
      collections: {}
    } as any)

    const validationErrors = await PermissionValidator(permission)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when name is not a name", async () => {
    const permission = new Permission({
      id: "id",
      name: null,
      collections: {}
    } as any)

    const validationErrors = await PermissionValidator(permission)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns true when valid permission", async () => {
    const permission = new Permission({
      id: "id",
      name: "name",
      collections: {
        test: {
          create: true,
          retrieve: true,
          list: true,
          delete: true,
          update: true
        }
      }
    })

    const validationErrors = await PermissionValidator(permission)

    expect(validationErrors.length).toStrictEqual(0)
  })
})
