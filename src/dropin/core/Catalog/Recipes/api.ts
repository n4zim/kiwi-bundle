import { ModelAPI } from "../../Formats"
import { RecipeId, RecipeData, RecipeResponse } from "./data"
import { Recipe } from "./entity"

export const Recipes = ModelAPI<RecipeId, RecipeData, RecipeResponse, Recipe>([ "recipes" ], data => new Recipe(data))

/*static getDocument<Output = Document>(recipe: RecipeId, document: string, params: FetchParams = {}): Promise<Output> {
  if(typeof params.linesOnly !== "undefined") {
    return Promise.reject(`The "linesOnly" parameter can only be used by the getDocumentLines function`)
  }
  return API.request<Output>(FetchMethod.GET, `recipes/${recipe}/documents/${document}`, params as FetchParams)
}

static getDocumentLines(recipe: RecipeId, document: string, params: FetchParams = {}): Promise<Line[]> {
  params.linesOnly = "1"
  return API.request<Line[]>(FetchMethod.GET, `recipes/${recipe}/documents/${document}`, params)
}*/
