import { ModelEntity } from "../../Formats/Models/Entity"
import { GroupId, GroupData } from "./data"
import { GroupValidator } from "./validations"

export class Group extends ModelEntity<GroupId, GroupData> implements GroupData {
  permissions: GroupData["permissions"]
  users: GroupData["users"]

  constructor(data: GroupData) {
    super(data)
    this.permissions = data.permissions
    this.users = data.users
  }

  getUsers() {
    // return GroupsAPI.getUsers(this.id)
  }

  getPermissions() {
    // return GroupsAPI.getPermissions(this.id)
  }

  getTokens() {
    // return GroupsAPI.getTokens(this.id)
  }

  validate() {
    return GroupValidator(this)
  }

  save() {
    if(typeof this.id !== "undefined") {
      // return GroupsAPI.update(this)
    }
    // return GroupsAPI.create(this)
    return Promise.reject()
  }

  toJS(): GroupData {
    throw new Error("Method not implemented.")
  }

  archive(): Promise<any> {
    if(typeof this.id !== "undefined") {
      // return GroupsAPI.archive(this.id)
    }
    this.archivedAt = new Date()
    return Promise.resolve()
  }

  unarchive(): Promise<any> {
    if(typeof this.id !== "undefined") {
      // return GroupsAPI.unarchive(this.id)
    }
    if(typeof this.archivedAt !== "undefined") {
      delete this.archivedAt
    }
    return Promise.resolve()
  }

  delete(): Promise<any> {
    if(typeof this.id !== "undefined") {
      /*return GroupsAPI.deleteById(this.id).then(result => {
        delete this.id
        return result
      })*/
    }
    return Promise.resolve()
  }

}
