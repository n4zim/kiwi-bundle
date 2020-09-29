import { UserId } from "../../Owners/Users/data"
import { CompanyId } from "../../Owners/Companies/data"
import { XOR } from "../../Code"
import { RecipeType } from "../../Context"

export type PathObject = {
  type: RecipeType
  owner: XOR<UserId, CompanyId>
  recipe?: string[]
  id?: string[]
  version?: string
}
