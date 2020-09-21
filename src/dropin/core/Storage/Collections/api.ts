import { ModelAPI } from "../../Formats"
import { CollectionId, CollectionData, CollectionResponse } from "./data"
import { Collection } from "./entity"

export const Collections = ModelAPI<CollectionId, CollectionData, CollectionResponse, Collection>([ "collections" ], data => new Collection(data))
