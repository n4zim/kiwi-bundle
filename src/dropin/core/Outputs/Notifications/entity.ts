import { ModelEntity } from "../../Formats/Models/Entity"
import { NotificationId, NotificationData } from "./data"

export class Notification extends ModelEntity<NotificationId, NotificationData> implements NotificationData {
  user: NotificationData["user"]
  content: NotificationData["content"]
  done: NotificationData["done"]
  author: NotificationData["author"]

  constructor(data: NotificationData) {
    super(data)
    this.user = data.user
    this.content = data.content
    this.done = data.done
    this.author = data.author
  }

  getUser() {
    // return NotificationsAPI.getUser(this.id, this.user)
  }

  getAuthor() {
    // return NotificationsAPI.getAuthor(this.id, this.author)
  }

  toJS(): NotificationData {
    throw new Error("Method not implemented.")
  }

  validate(): Promise<import("../..").Issue[]> {
    throw new Error("Method not implemented.")
  }

  save() {
    /*if(typeof this.id !== "undefined") {
      return NotificationsAPI.update(this)
    }
    return NotificationsAPI.create(this)*/
    return Promise.reject()
  }

  archive(): Promise<any> {
    if(typeof this.id !== "undefined") {
      // return NotificationsAPI.archive(this.id)
    }
    this.archivedAt = new Date()
    return Promise.resolve()
  }

  unarchive(): Promise<any> {
    if(typeof this.id !== "undefined") {
      // return NotificationsAPI.unarchive(this.id)
    }
    if(typeof this.archivedAt !== "undefined") {
      delete this.archivedAt
    }
    return Promise.resolve()
  }

  delete(): Promise<any> {
    if(typeof this.id !== "undefined") {
      /*return NotificationsAPI.deleteById(this.id).then(result => {
        delete this.id
        return result
      })*/
    }
    return Promise.resolve()
  }

}
