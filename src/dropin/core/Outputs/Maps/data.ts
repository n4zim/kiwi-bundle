import { MapOptions } from "../../Context/Maps/options"
import { CollectionSelector } from "../../Formats/Selectors/Collection"
import { ModelResponse, ModelResponseUpdatable } from "../../Formats/Models/Response"
import { ModelRecipe } from "../../Formats/Models/Recipe"
import { RecipeType } from "../../Context/Types/RecipeType"

export type MapId = string

export type MapData = {
  options: MapOptions
  lines: CollectionSelector[]
}

export type MapResponse = ModelResponse<MapId> & MapData & ModelResponseUpdatable

export type MapRecipe = ModelRecipe<RecipeType.MAP, MapId> & MapData
