import { ModelAPI } from "../../Formats"
import { GroupId, GroupData, GroupResponse } from "./data"
import { Group } from "./entity"

export const Groups = ModelAPI<GroupId, GroupData, GroupResponse, Group>([ "groups" ], data => new Group(data))
