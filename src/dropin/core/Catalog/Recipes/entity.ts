import { ModelEntity } from "../../Formats/Models/Entity"
import { RecipeId, RecipeData } from "./data"
// import { RecipesAPI } from "./api"

export class Recipe extends ModelEntity<RecipeId, RecipeData> implements RecipeData {
  name: RecipeData["name"]
  owners: RecipeData["owners"]

  constructor(data: RecipeData) {
    super(data)
    this.name = data.name
    this.owners = data.owners
  }

  toJS(): RecipeData {
    throw new Error("Method not implemented.")
  }

  getAuthors() {
    // return RecipesAPI.getAuthors(this.id)
  }

  getCompany() {
    // return RecipesAPI.getCompany(this.id)
  }

  getCollections() {
    // return RecipesAPI.getCollections(this.id)
  }

  getSections() {
    // return RecipesAPI.getSections(this.id)
  }

  getPermissions() {
    // return RecipesAPI.getPermissions(this.id)
  }

  getLines() {
    // return RecipesAPI.getLines(this.id)
  }

  getUsers() {
    // return RecipesAPI.getUsers(this.id)
  }

  validate() {
    // return RecipeValidator(this)
    return Promise.reject()
  }

  save() {
    if(typeof this.id !== "undefined") {
      // return RecipesAPI.update(this)
    }
    // return RecipesAPI.create(this)
    return Promise.reject()
  }

  archive(): Promise<any> {
    if(typeof this.id !== "undefined") {
      // return RecipesAPI.archive(this.id)
    }
    this.archivedAt = new Date()
    return Promise.resolve()
  }

  unarchive(): Promise<any> {
    if(typeof this.id !== "undefined") {
      // return RecipesAPI.unarchive(this.id)
    }
    if(typeof this.archivedAt !== "undefined") {
      delete this.archivedAt
    }
    return Promise.resolve()
  }

  delete(): Promise<any> {
    if(typeof this.id !== "undefined") {
      /*return RecipesAPI.deleteById(this.id).then(result => {
        delete this.id
        return result
      })*/
    }
    return Promise.resolve()
  }

}
