import { ModelEntity } from "../../Formats/Models/Entity"
import { CollectionId, CollectionData } from "./data"

export class Collection extends ModelEntity<CollectionId, CollectionData> implements CollectionData {
  extends: CollectionData["extends"]
  name: CollectionData["name"]
  fields: CollectionData["fields"]

  constructor(data: CollectionData) {
    super(data)
    this.extends = data.extends
    this.name = data.name
    this.fields = data.fields
  }

  save() {
    if(typeof this.id !== "undefined") {
      // return CollectionsAPI.update(this)
    }
    // return CollectionsAPI.create(this)
    return Promise.reject()
  }

  toJS(): CollectionData {
    throw new Error("Method not implemented.")
  }

  validate(): Promise<import("../..").Issue[]> {
    throw new Error("Method not implemented.")
  }

  archive(): Promise<any> {
    if(typeof this.id !== "undefined") {
      // return CollectionsAPI.archive(this.id)
    }
    this.archivedAt = new Date()
    return Promise.resolve()
  }

  unarchive(): Promise<any> {
    if(typeof this.id !== "undefined") {
      // return CollectionsAPI.unarchive(this.id)
    }
    if(typeof this.archivedAt !== "undefined") {
      delete this.archivedAt
    }
    return Promise.resolve()
  }

  delete(): Promise<any> {
    if(typeof this.id !== "undefined") {
      /*return CollectionsAPI.deleteById(this.id).then(result => {
        delete this.id
        return result
      })*/
    }
    return Promise.resolve()
  }

}
