import { XOR } from "../../Code"
import { UserId } from "../../Owners/Users/data"
import { CompanyId } from "../../Owners/Companies/data"
import { ModelResponse } from "../../Formats/Models/Response"

export type NotificationId = string

export type NotificationData = {
  user: UserId
  content: string
  done: boolean
  author?: XOR<{ user: UserId }, { company: CompanyId }>
}

export type NotificationResponse = ModelResponse<NotificationId> & NotificationData

