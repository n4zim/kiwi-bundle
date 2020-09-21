import { NameField, ModelRecipe, NameField_ForAPerson } from "../../Formats"
import { ModelResponse, ModelResponseUpdatable } from "../../Formats/Models/Response"
import { RecipeType } from "../../Context"

export type UserId = string

export type UserShort = string

export type UserData = {
  name?: NameField_ForAPerson
  short?: UserShort
  emails: string[]
  realms?: { [realm: string]: { [name: string]: string } }
  public?: boolean
}
export type UserResponse = ModelResponse<UserId> & UserData & ModelResponseUpdatable

export type UserRecipe = ModelRecipe<RecipeType.USER, UserShort> & Omit<UserData, "short">
