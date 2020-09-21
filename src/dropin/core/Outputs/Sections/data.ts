import { CollectionId } from "../../Storage/Collections"
import { NameField, ModelRecipe } from "../../Formats"
import { ModelResponse, ModelResponseUpdatable } from "../../Formats/Models/Response"
import { RecipeType } from "../../Context"

export type SectionId = string

export type SectionDataList = {
  collection: CollectionId
}

export type SectionData = {
  name: NameField
  list?: SectionDataList
  children?: SectionId[]
}

export type SectionResponse = ModelResponse<SectionId> & SectionData & ModelResponseUpdatable

export type SectionRecipe = ModelRecipe<RecipeType.SECTION, SectionId>
