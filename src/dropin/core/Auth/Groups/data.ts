import { UserId } from "../../Owners/Users"
import { PermissionId } from "../Permissions"
import { ModelResponse } from "../../Formats/Models/Response"
import { ModelRecipe } from "../../Formats"
import { RecipeType } from "../../Context"

export type GroupId = string

export type GroupData = {
  users: UserId[]
  permissions: PermissionId[]
}

export type GroupResponse = ModelResponse<GroupId> & GroupData

export type GroupRecipe = ModelRecipe<RecipeType.GROUP, GroupId> & GroupData
