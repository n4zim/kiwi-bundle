import { ModelAPI } from "../../Formats/Models/API"
import { NotificationId, NotificationData, NotificationResponse } from "./data"
import { Notification } from "./entity"

export const Notifications = ModelAPI<NotificationId, NotificationData, NotificationResponse, Notification>([ "notifications" ], data => new Notification(data))
