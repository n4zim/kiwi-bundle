import { NameField, ModelRecipe } from "../../Formats"
import { RecipeType } from "../../Context"
import { ModelResponse } from "../../Formats/Models/Response"

export type CollectionId = string

export type CollectionData = {
  extends: CollectionId
  name: NameField
  fields: any
}

export type CollectionResponse = ModelResponse<CollectionId> & CollectionData

export type CollectionRecipe = ModelRecipe<RecipeType.COLLECTION, CollectionId> & CollectionData
