import { NameField, ModelRecipe } from "../../Formats"
import { ModelResponse } from "../../Formats/Models/Response"
import { RecipeType } from "../../Context"

export type PermissionId = string

export interface PermissionDataCollection {
  [name: string]: {
    create: any
    retrieve: any
    list: any
    delete: any
    update: any
  }
}

export interface PermissionData {
  name: NameField
  collections: PermissionDataCollection
}

export type PermissionResponse = ModelResponse<PermissionId> & PermissionData

export type PermissionRecipe = ModelRecipe<RecipeType.PERMISSION, PermissionId> & PermissionData
