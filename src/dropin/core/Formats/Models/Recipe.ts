import { RecipeType } from "../../Context/Types/RecipeType"
import { NameField } from "../Fields"

export interface ModelRecipe<Type = RecipeType, Id = string, Name = NameField> {
  $: Type
  id: Id
  name?: Name
}
