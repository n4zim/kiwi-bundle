import { NameField, ModelRecipe } from "../../Formats"
import { ModelResponse, ModelResponseUpdatable } from "../../Formats/Models/Response"
import { RecipeType } from "../../Context"

export type CompanyId = string

export type CompanyData = {
  name?: NameField
}

export type CompanyResponse = ModelResponse<CompanyId> & CompanyData & ModelResponseUpdatable

export type CompanyRecipe = ModelRecipe<RecipeType.COMPANY, CompanyId>
