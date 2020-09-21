/*import { UserValidator } from "./data"
import { User } from "./entity"

describe("src/core/Auth/Users/data", () => {
  it("returns false when id is not a string", async () => {
    const user = new User({
      id: null,
      name: "user_name",
      emails: [],
      password: "popo",
      recipes: [],
      companies: [],
      groups: [],
      forgottenPassword: {}
    } as any)

    const validationErrors = await UserValidator(user)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when name is not a name", async () => {
    const user = new User({
      id: "user_id",
      name: null,
      emails: [],
      password: "popo",
      recipes: [],
      companies: [],
      groups: [],
      forgottenPassword: {}
    } as any)

    const validationErrors = await UserValidator(user)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when emails is not a list", async () => {
    const user = new User({
      id: "user_id",
      name: "name",
      emails: null,
      password: "popo",
      recipes: [],
      companies: [],
      groups: [],
      forgottenPassword: {}
    } as any)

    const validationErrors = await UserValidator(user)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when password is not a string", async () => {
    const user = new User({
      id: "user_id",
      name: "name",
      emails: [],
      password: null,
      recipes: [],
      companies: [],
      groups: [],
      forgottenPassword: {}
    } as any)

    const validationErrors = await UserValidator(user)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when recipes is not a list", async () => {
    const user = new User({
      id: "user_id",
      name: "name",
      emails: [],
      password: "password",
      recipes: null,
      companies: [],
      groups: [],
      forgottenPassword: {}
    } as any)

    const validationErrors = await UserValidator(user)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when companies is not a list", async () => {
    const user = new User({
      id: "user_id",
      name: "name",
      emails: [],
      password: "password",
      recipes: [],
      companies: null,
      groups: [],
      forgottenPassword: {}
    } as any)

    const validationErrors = await UserValidator(user)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when groups is not a list", async () => {
    const user = new User({
      id: "user_id",
      name: "name",
      emails: [],
      password: "password",
      recipes: [],
      companies: [],
      groups: null,
      forgottenPassword: {}
    } as any)

    const validationErrors = await UserValidator(user)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns true when valid user", async () => {
    const user = new User({
      id: "user_id",
      name: "name",
      emails: [],
      password: "password",
      recipes: [],
      companies: [],
      groups: [],
      forgottenPassword: {}
    } as any)

    const validationErrors = await UserValidator(user)

    expect(validationErrors.length).toStrictEqual(0)
  })
})
*/
