import { API, FetchPath } from "../../Code/API"
import { RecipeType } from "../../Context/Types/RecipeType"
import { v7r } from "../../Code/v7r"
import { Issue } from "./Error"
import { ModelRecipe } from "./Recipe"
import { v7rData } from "./v7r"

export abstract class ModelEntity<Id extends string, Data extends any> {
  protected id?: Id
  protected createdAt?: Date
  protected updatedAt?: Date
  protected archivedAt?: Date

  constructor(data: any) {
    if(typeof data.id !== "undefined") {
      this.id = data.id
    }
    if(typeof data.createdAt !== "undefined") {
      this.createdAt = new Date(data.createdAt)
    }
    if(typeof data.updatedAt !== "undefined") {
      this.updatedAt = new Date(data.updatedAt)
    }
    if(typeof data.archivedAt !== "undefined") {
      this.archivedAt = new Date(data.archivedAt)
    }
  }

  abstract save<Response = any>(): Promise<Response>

  abstract delete<Response = any>(): Promise<Response>

  abstract toJS(): Data

  abstract validate(): Promise<Issue[]>

  protected __archive<Response = any>(path: FetchPath): Promise<Response> {
    if(typeof this.id !== "undefined") {
      return API.archive<Id, Response>(path, this.id)
    }
    this.archivedAt = new Date()
    return Promise.reject()
  }

  protected __create<Response extends any>(path: FetchPath, data: any): Promise<Response> {
    if(typeof this.id !== "undefined") return Promise.reject()
    return API.create<Data, Response>(path, data).then((response: any) => {
      if(typeof response.date !== "undefined") {
        this.createdAt = new Date(response.date)
        this.updatedAt = new Date(response.date)
      }
      return response
    })
  }

  protected __unarchive(path: FetchPath): Promise<any> {
    if(typeof this.id !== "undefined") {
      return API.unarchive<Id>(path, this.id)
    }
    if(typeof this.archivedAt !== "undefined") {
      delete this.archivedAt
    }
    return Promise.resolve()
  }

  protected __delete(callback: (id: Id) => Promise<any>) {
    if(typeof this.id !== "undefined") {
      return callback(this.id).then((result: any) => {
        delete this.id
        return result
      })
    }
    return Promise.resolve()
  }

  protected __save(path: FetchPath, data: any): Promise<any> {
    if(typeof this.id === "undefined") return Promise.reject()
    return API.update<Data, any>(path, data).then(response => {
      if(typeof response.date !== "undefined") {
        this.updatedAt = new Date(response.date)
      }
      return this
    })
  }

  protected __validate<validationData extends v7rData>(data: validationData) {
    return v7r<validationData>(data, this.toJS() as v7rData)
  }

  protected __toRecipe<Recipe extends ModelRecipe>(type: RecipeType): Recipe|undefined {
    if(typeof this.id === "undefined") return
    return Object.assign(this.toJS() as any, { $: type, id: this.id }) as any
  }

  getId() {
    return this.id
  }
}
