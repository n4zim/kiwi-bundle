import { ModelAPI } from "../../Formats"
import { MapId, MapData, MapResponse } from "./data"
import { Map } from "./entity"

export const Maps = ModelAPI<MapId, MapData, MapResponse, Map>([ "maps" ], data => new Map(data))
