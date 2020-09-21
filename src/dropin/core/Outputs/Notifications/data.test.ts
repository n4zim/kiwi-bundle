import { NotificationValidator } from "./data"
import { Notification } from "./entity"

describe("src/core/Output/Notification/data", () => {
  it("returns false when id is not a string", async () => {
    const notification = new Notification({
      id: null,
      user: "user_id",
      content: "content",
      isRead: false,
      author: "user_id"
    } as any)

    const validationErrors = await NotificationValidator(notification)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when user is not a string", async () => {
    const notification = new Notification({
      id: "notification_id",
      user: null,
      content: "content",
      isRead: false,
      author: "user_id"
    } as any)

    const validationErrors = await NotificationValidator(notification)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when content is not a string", async () => {
    const notification = new Notification({
      id: "notification_id",
      user: "user_id",
      content: null,
      isRead: false,
      author: "user_id"
    } as any)

    const validationErrors = await NotificationValidator(notification)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when is read is not a boolean", async () => {
    const notification = new Notification({
      id: "notification_id",
      user: "user_id",
      content: "content",
      isRead: null,
      author: "user_id"
    } as any)

    const validationErrors = await NotificationValidator(notification)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns false when is author is not a string", async () => {
    const notification = new Notification({
      id: "notification_id",
      user: "user_id",
      content: "content",
      isRead: false,
      author: null
    } as any)

    const validationErrors = await NotificationValidator(notification)

    expect(validationErrors.length).toStrictEqual(1)
  })

  it("returns true when author is valid", async () => {
    const notification = new Notification({
      id: "notification_id",
      user: "user_id",
      content: "content",
      isRead: false,
      author: "author_id"
    } as any)

    const validationErrors = await NotificationValidator(notification)

    expect(validationErrors.length).toStrictEqual(0)
  })
})
