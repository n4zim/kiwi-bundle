import { ModelEntity } from "../../Formats/Models/Entity"
import { TokenId, TokenData, TokenResponse, TokenRecipe } from "./data"
import { Tokens } from "./api"
import { API } from "../../Code/API"
import { RecipeType } from "../../Context/Types/RecipeType"
import { v7rToken } from "./validations"
import { v7r } from "../../Code/v7r"

export class Token extends ModelEntity<TokenId, TokenData> implements TokenData {
  short: TokenData["short"]
  expiresAt?: TokenData["expiresAt"]
  owner: TokenData["owner"]
  name?: TokenData["name"]

  constructor(data: TokenData) {
    super(data)
    this.short = data.short
    this.expiresAt = data.expiresAt
    this.owner = data.owner
    this.name = data.name
  }

  create(): Promise<void> {
    return this.__create<TokenResponse>(Tokens.getPath(), {
      id: this.id,
      company: this.owner.company,
      name: this.name,
      expiresAt: this.expiresAt
    }).then(response => {
      this.id = response.id
    })
  }

  save(): Promise<any> {
    return this.__save(Tokens.getPath(), {
      name: this.name,
      expiresAt: this.expiresAt,
    })
  }

  delete(): Promise<any> {
    return this.__delete(Tokens.deleteById)
  }

  toJS(): TokenData {
    return {
      short: this.short,
      owner: this.owner,
      name: this.name,
      expiresAt: this.expiresAt,
    }
  }

  toRecipe(): TokenRecipe | undefined {
    return super.__toRecipe(RecipeType.TOKEN)
  }

  getOwner() {
    if(typeof this.id === "undefined") return Promise.reject()
    return API.get<TokenRecipe>(Tokens.getPath().concat([this.id, "owner"]))
  }

  validate() {
    return v7r(v7rToken, this.toJS())
  }

  getCreatedAt() {
    return this.createdAt
  }

  getUpdatedAt() {
    return this.updatedAt
  }
}
