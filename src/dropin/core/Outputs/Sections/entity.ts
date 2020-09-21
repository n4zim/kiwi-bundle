import { ModelEntity } from "../../Formats/Models/Entity"
import { SectionId, SectionData } from "./data"
import { SectionValidator } from "./validations"

export class Section extends ModelEntity<SectionId, SectionData> implements SectionData {
  name: SectionData["name"]
  list: SectionData["list"]
  children: SectionData["children"]

  constructor(data: SectionData) {
    super(data)
    this.name = data.name
    this.list = data.list
    this.children = data.children
  }

  getRecipes() {
    // return SectionsAPI.getRecipes(this.id)
  }

  validate() {
    return SectionValidator(this)
  }

  save() {
    /*if(typeof this.id !== "undefined") {
      return SectionsAPI.update(this)
    }
    return SectionsAPI.create(this)*/
    return Promise.reject()
  }

  toJS(): SectionData {
    throw new Error("Method not implemented.")
  }

  archive(): Promise<any> {
    if(typeof this.id !== "undefined") {
      // return SectionsAPI.archive(this.id)
    }
    this.archivedAt = new Date()
    return Promise.resolve()
  }

  unarchive(): Promise<any> {
    if(typeof this.id !== "undefined") {
      // return SectionsAPI.unarchive(this.id)
    }
    if(typeof this.archivedAt !== "undefined") {
      delete this.archivedAt
    }
    return Promise.resolve()
  }

  delete(): Promise<any> {
    if(typeof this.id !== "undefined") {
      /*return SectionsAPI.deleteById(this.id).then(result => {
        delete this.id
        return result
      })*/
    }
    return Promise.resolve()
  }

}
