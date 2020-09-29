import { CompanyValidator } from "./data"
import { Company } from "./entity"

describe("src/core/Auth/Companies/data", () => {
  it("returns false when id is not a string", async () => {
    const company = new Company({
      id: null,
      name: "name"
    } as any)

    const validationErrors = await CompanyValidator(company)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when name is not a name", async () => {
    const company = new Company({
      id: "id",
      name: null
    } as any)

    const validationErrors = await CompanyValidator(company)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns true when valid company", async () => {
    const company = new Company({
      id: "id",
      name: "name"
    })

    const validationErrors = await CompanyValidator(company)

    expect(validationErrors.length).toStrictEqual(0)
  })
})
