import { ModelAPI } from "../../Formats"
import { PermissionId, PermissionData, PermissionResponse } from "./data"
import { Permission } from "./entity"

export const Permissions = ModelAPI<PermissionId, PermissionData, PermissionResponse, Permission>([ "permissions" ], data => new Permission(data))
