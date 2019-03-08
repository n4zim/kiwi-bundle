import { WorkerChangeMessage, WorkerMessageType, WorkerMessageChangeType } from "./serviceWorkerTypes"
import logger from "./logger"

interface WindowKiwi extends Window {
  kiwi: { sw: string }
}

const W = window as WindowKiwi

type Hook<Entity> = { [databaseAndStore: string]: (entity: Entity) => void }

class ServiceWorkerClient {
  queue: any[] = []
  changesHooks: Hook<any> = {}

  constructor() {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", () => {

        navigator.serviceWorker.onmessage = (event: any) => {
          const message: WorkerChangeMessage = event.data

          // Change
          if(message.type === WorkerMessageType.CHANGE) {
            const hook = this.changesHooks[`${message.database}-${message.store}`]
            if(typeof hook !== "undefined") {
              hook(message.entity)
            }

          // Cache
          } else if(message.type === WorkerMessageType.CACHE) {
            console.log("RELOAD")
            window.location.reload()
          }
        }

        navigator.serviceWorker.register(W.kiwi.sw).then(() => {
          return navigator.serviceWorker.ready
        }).then(() => {
          logger.logSuccess("ServiceWorker", "Ready")

          this.postMessage({
            type: WorkerMessageType.CACHE,
          })
        })
      })
    }
  }

  private postMessage<Type>(message: Type) {
    const controller = navigator.serviceWorker.controller
    if(controller !== null) {
      return controller.postMessage(message)
    } else {
      return null
    }
  }

  propagateChanges<Entity>(type: WorkerMessageChangeType, databaseName: string, storeName: string, entity: Entity) {
    this.postMessage<WorkerChangeMessage>({
      type: WorkerMessageType.CHANGE,
      change: type,
      database: databaseName,
      store: storeName,
      entity,
    })
  }

  addChangesHook<Entity>(database: string, store: string, action: (entity: Entity) => void) {
    this.changesHooks[`${database}-${store}`] = action
  }

}

export default new ServiceWorkerClient
