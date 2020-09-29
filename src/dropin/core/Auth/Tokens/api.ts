import { ModelAPI } from "../../Formats/Models/API"
import { TokenId, TokenData, TokenResponse } from "./data"
import { Token } from "./entity"

export const Tokens = ModelAPI<TokenId, TokenData, TokenResponse, Token>(["tokens"], data => new Token(data))
