import { UserId } from "../../Owners/Users"
import { ModelResponse, ModelResponseUpdatable } from "../../Formats/Models/Response"
import { ModelRecipe } from "../../Formats"
import { RecipeType } from "../../Context"
import { CompanyId } from "../../Owners"

export type TokenId = string

export interface TokenData {
  short?: string
  name?: string
  owner: {
    user?: UserId,
    company?: CompanyId,
  }
  expiresAt?: Date
}

export type TokenResponse = ModelResponse<TokenId> & TokenData & ModelResponseUpdatable

export type TokenRecipe = ModelRecipe<RecipeType, TokenId> & TokenData
