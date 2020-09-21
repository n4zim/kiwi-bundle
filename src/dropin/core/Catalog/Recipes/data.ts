import { NameField, ModelRecipe } from "../../Formats"
import { UserId } from "../../Owners"
import { ModelResponse } from "../../Formats/Models/Response"
import { RecipeType } from "../../Context"

export type RecipeId = string

export type RecipeData = {
  name: NameField
  owners: UserId[]
}

export type RecipeResponse = ModelResponse<RecipeId> & RecipeData

export type RecipeRecipe = ModelRecipe<RecipeType.RECIPE, RecipeId> & RecipeData
