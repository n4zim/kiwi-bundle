import { ModelEntity } from "../../Formats/Models/Entity"
import { PermissionId, PermissionData } from "./data"
import { PermissionValidator } from "./validations"

export class Permission extends ModelEntity<PermissionId, PermissionData> implements PermissionData {
  name: PermissionData["name"]
  collections: PermissionData["collections"]

  constructor(data: PermissionData) {
    super(data)
    this.name = data.name
    this.collections = data.collections
  }

  getGroups() {
    // return PermissionsAPI.getGroups(this.id)
  }

  validate() {
    return PermissionValidator(this)
  }

  toJS(): PermissionData {
    throw new Error("Method not implemented.")
  }

  save() {
    if(typeof this.id !== "undefined") {
      // return PermissionsAPI.update(this)
    }
    // return PermissionsAPI.create(this)
    return Promise.reject()
  }

  archive(): Promise<any> {
    if(typeof this.id !== "undefined") {
      // return PermissionsAPI.archive(this.id)
    }
    this.archivedAt = new Date()
    return Promise.resolve()
  }

  unarchive(): Promise<any> {
    if(typeof this.id !== "undefined") {
      // return PermissionsAPI.unarchive(this.id)
    }
    if(typeof this.archivedAt !== "undefined") {
      delete this.archivedAt
    }
    return Promise.resolve()
  }

  delete(): Promise<any> {
    if(typeof this.id !== "undefined") {
      /*return PermissionsAPI.deleteById(this.id).then(result => {
        delete this.id
        return result
      })*/
    }
    return Promise.resolve()
  }

}
