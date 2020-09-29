import { v7r } from "../../Code/v7r"
import { FieldType } from "../../Context/Types/FieldType"
import { Notification } from "./entity"

export const NotificationValidator = (data: Notification) => v7r<Notification>(data, {

  id: {
    name: "id",
    type: FieldType.TEXT,
    options: {
      required: true,
    },
  },

  user: {
    name: "user",
    type: FieldType.TEXT,
    options: {
      required: true,
    },
  },

  content: {
    name: "content",
    type: FieldType.TEXT,
    options: {
      required: true,
    },
  },

  isRead: {
    name: "isRead",
    type: FieldType.BOOLEAN,
    options: {
      required: true,
    },
  },

  author: {
    name: "author",
    type: FieldType.TEXT,
    options: {
      required: true,
    },
  },

}, [ "v7r", "notification", "entity" ])
