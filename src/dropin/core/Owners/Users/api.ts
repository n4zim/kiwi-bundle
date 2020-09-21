import { UserData, UserId, UserResponse, UserRecipe } from "./data"
import { ModelAPI } from "../../Formats/Models/API"
import { User } from "./entity"
import { Token } from "../../Auth/Tokens/entity"
import { API, FetchMethod, FetchParams } from "../../Code/API"

export const Users = ModelAPI<UserId, UserData, UserResponse, User>([ "users" ], data => new User(data), {
  login: (email: string, password: string): Promise<{token: Token }> => {
    return API.request<{ user: User, token: Token }>(FetchMethod.POST, ["auth"], {}, {
      email: email,
      password: password,
    })
  },

  forgottenPassword: (email: string, hash?: string): Promise<{ success: boolean }> => {
    let params: FetchParams = { email }
    if(typeof hash !== "undefined") params.hash = hash
    return API.request<{ success: boolean }>(FetchMethod.POST, ["forgotten"], {}, params)
  },

  forgottenPasswordUpdate: (email: string, hash: string, password: string): Promise<Token> => {
    return API.request<Token>(FetchMethod.POST, ["forgotten"], {}, {
      email: email,
      hash: hash,
      password: password,
    })
  },

  fromRecipe: (recipe: UserRecipe): User|undefined => {
    return
  },
})

// 👌
