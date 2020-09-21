import { ModelEntity } from "../../Formats/Models/Entity"
import { UserId, UserData, UserRecipe, UserResponse } from "./data"
import { v7rUser } from "./validations"
import { API, FetchMethod } from "../../Code/API"
import { Users } from "./api"
import { CompanyData } from "../Companies/data"
import { GroupData } from "../../Auth/Groups/data"
import { NotificationId } from "../../Outputs/Notifications/data"
import { Notification } from "../../Outputs/Notifications/entity"
import { TokenData } from "../../Auth/Tokens/data"
import { RecipeType } from "../../Context/Types/RecipeType"
import { Token } from "../../Auth/Tokens/entity"
import { XOR } from "../../Code/XOR"
import { NameField_ForAPerson } from "../../Formats"

export class User extends ModelEntity<UserId, UserData> implements UserData {
  name: UserData["name"]
  short: UserData["short"]
  emails: UserData["emails"]
  realms: UserData["realms"]
  public: UserData["public"]

  constructor(data: UserData) {
    super(data)
    this.name = data.name
    this.short = data.short
    this.emails = data.emails
    this.realms = data.realms
    this.public = data.public
  }

  register(password: string, invitationCode: string): Promise<Token> {
    return this.__create<{ user: string, token: {id: string, jwt: string}, date: number }>(
      Users.getPath(),
      Object.assign(this.toJS(), { password, invitationCode }),
    ).then(response => {
      this.id = response.user
      return new Token({
        short: response.token.jwt,
        owner: {user: this.id},
      })
    })
  }

  save(): Promise<any> {
    if(typeof this.id === "undefined") return Promise.reject()
    let data: any = {
      id: this.id,
      name: this.name,
      short: this.short,
      public: this.public,
    }
    return this.__save(Users.getPath(), data)
  }

  validate() {
    return this.__validate(v7rUser)
  }

  archive() {
    return super.__archive(Users.getPath())
  }

  unarchive() {
    return super.__unarchive(Users.getPath())
  }

  getRecipes(): Promise<any> {
    if(typeof this.id === "undefined") return Promise.reject()
    return API.get<UserRecipe>(Users.getPath().concat([ this.id, "recipes" ]))
  }

  getCompanies() {
    if(typeof this.id === "undefined") return Promise.reject()
    return API.get<CompanyData>(Users.getPath().concat([ this.id, "companies" ]))
  }

  getGroups() {
    if(typeof this.id === "undefined") return Promise.reject()
    return API.get<GroupData>(Users.getPath().concat([ this.id, "groups" ]))
  }

  getProjects() {
    if(typeof this.id === "undefined") return Promise.reject()
    return API.get(Users.getPath().concat([ this.id, "projects" ]))
  }

  getRevisions() {
    if(typeof this.id === "undefined") return Promise.reject()
    return API.get(Users.getPath().concat([ this.id, "revisions" ]))
  }

  getNotifications() {
    if(typeof this.id === "undefined") return Promise.reject()
    return API.request<Notification[]>(FetchMethod.GET, Users.getPath().concat([ this.id, "notifs" ]))
  }

  setNotificationAsRead(notification: NotificationId, isRead: boolean) {
    if(typeof this.id === "undefined") return Promise.reject()
    return API.request<Notification[]>(
      FetchMethod.POST,
      Users.getPath().concat([ this.id, "notifs", notification ]),
      {},
      { is_read: isRead },
    )
  }

  getTokens() {
    if(typeof this.id === "undefined") return Promise.reject()
    return API.get<TokenData>(Users.getPath().concat([ this.id, "tokens" ]))
  }

  getName(): string {
    let name = ""
    if(typeof (this.name as any).firstname !== "undefined") {
      name = (this.name as any).firstname
    }
    if(typeof (this.name as any).lastname !== "undefined") {
      if(name.length === 0) {
        name = (this.name as any).lastname
      } else {
        name += " " + (this.name as any).lastname
      }
    }
    return name
  }

  toJS(): XOR<UserData, UserResponse> {
    let result = {
      name: this.name,
      emails: this.emails,
      short: this.short,
      realms: this.realms,
      public: this.public,
    }
    if(typeof this.id === "undefined" || typeof this.createdAt === "undefined" || typeof this.updatedAt === "undefined")
      return result
    Object.assign(result, {
      id: this.id,
      createdAt: this.createdAt.getTime(),
      updatedAt: this.updatedAt.getTime(),
    })
    return result
  }

  toRecipe(): UserRecipe | undefined {
    return super.__toRecipe(RecipeType.USER)
  }

  delete(): Promise<any> {
    return this.__delete(Users.deleteById)
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
