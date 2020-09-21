/*import { TokenValidator } from "./validations"
import { Token } from "./entity"

describe("src/core/Auth/Tokens/data", () => {
  it("returns false when id is not a string", async () => {
    const token = new Token({
      id: null,
      jwt: "jwt",
      expiresAt: new Date(),
      user: "user_id",
      name: "name",
      groups: []
    } as any)

    const validationErrors = await TokenValidator(token)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when name is not a name", async () => {
    const token = new Token({
      id: "id",
      jwt: "jwt",
      expiresAt: new Date(),
      user: "user_id",
      name: null,
      groups: []
    } as any)

    const validationErrors = await TokenValidator(token)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when jwt is not a string", async () => {
    const token = new Token({
      id: "id",
      jwt: null,
      expiresAt: new Date(),
      user: "user_id",
      name: "popo",
      groups: []
    } as any)

    const validationErrors = await TokenValidator(token)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when expiresAt is not a date", async () => {
    const token = new Token({
      id: "id",
      jwt: "jwt",
      expiresAt: null,
      user: "user_id",
      name: "popo",
      groups: []
    } as any)

    const validationErrors = await TokenValidator(token)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when user is not a string", async () => {
    const token = new Token({
      id: "id",
      jwt: "jwt",
      expiresAt: new Date(),
      user: null,
      name: "popo",
      groups: []
    } as any)

    const validationErrors = await TokenValidator(token)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when groups is not a list", async () => {
    const token = new Token({
      id: "id",
      jwt: "jwt",
      expiresAt: new Date(),
      user: "user_id",
      name: "popo",
      groups: null
    } as any)

    const validationErrors = await TokenValidator(token)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns true when valid token", async () => {
    const token = new Token({
      id: "id",
      jwt: "jwt",
      expiresAt: new Date(),
      user: "user_id",
      name: "popo",
      groups: []
    } as any)

    const validationErrors = await TokenValidator(token)

    expect(validationErrors.length).toStrictEqual(0)
  })
})*/
