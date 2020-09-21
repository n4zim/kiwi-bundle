import { SectionValidator } from "./data"
import { Section } from "./entity"

describe("src/core/Display/Section/data", () => {
  it("returns false when id is not a string", async () => {
    const section = new Section({
      id: null,
      name: "section_name",
      list: {},
      children: []
    } as any)

    const validationErrors = await SectionValidator(section)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when name is not a name", async () => {
    const section = new Section({
      id: "section_id",
      name: null,
      list: {},
      children: []
    } as any)

    const validationErrors = await SectionValidator(section)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when children is not a list", async () => {
    const section = new Section({
      id: "section_id",
      name: "section_name",
      list: {},
      children: null
    } as any)

    const validationErrors = await SectionValidator(section)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns true when valid section", async () => {
    const section = new Section({
      id: "section_id",
      name: "section_name",
      list: {},
      children: []
    } as any)

    const validationErrors = await SectionValidator(section)

    expect(validationErrors.length).toStrictEqual(0)
  })
})
