import { ModelEntity } from "../../Formats/Models/Entity"
import { CompanyId, CompanyData, CompanyRecipe } from "./data"
import { RecipeData } from "../../Catalog/Recipes/data"
import { Companies } from "./api"
import { UserData } from "../Users/data"
import { RecipeType } from "../../Context/Types/RecipeType"
import { v7rCompany } from "./validations"
import { API } from "../../Code/API"

export class Company extends ModelEntity<CompanyId, CompanyData> implements CompanyData {
  name?: CompanyData["name"]

  constructor(data: CompanyData) {
    super(data)
    this.name = data.name
  }

  getRecipes() {
    if(typeof this.id === "undefined") return Promise.reject()
    return API.get<RecipeData>(Companies.getPath().concat([this.id, "recipes"]))
  }

  getUsers() {
    if(typeof this.id === "undefined") return Promise.reject()
    return API.get<UserData>(Companies.getPath().concat([this.id, "users"]))
  }

  save(): Promise<any> {
    return this.__save(Companies.getPath(), {})
  }

  toJS(): CompanyData {
    return {
      name: this.name
    }
  }

  toRecipe(): CompanyRecipe | undefined {
    return super.__toRecipe(RecipeType.COMPANY)
  }

  delete(): Promise<any> {
    return this.__delete(Companies.deleteById)
  }

  validate() {
    return this.__validate(v7rCompany)
  }

  archive() {
    return super.__archive(Companies.getPath())
  }

  unarchive() {
    return super.__unarchive(Companies.getPath())
  }

  getCreatedAt() {
    return this.createdAt
  }

  getUpdatedAt() {
    return this.updatedAt
  }

  getArchivedAt() {
    return this.archivedAt
  }
}
