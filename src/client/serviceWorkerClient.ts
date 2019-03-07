import Repository from "./storage/Repository"
import logger from "./logger"

interface WindowKiwi extends Window {
  kiwi: { sw: string }
}

const W = window as WindowKiwi

export enum WorkerMessageType { CHANGE, CACHE }
export enum WorkerMessageChangeType { CREATE, UPDATE, DELETE }

interface WorkerMessage {
  type: WorkerMessageType,
}

interface WorkerChangeMessage<Entity = any> extends WorkerMessage {
  change: WorkerMessageChangeType,
  database: string,
  store: string,
  entity: Entity,
}

type Hook<Entity> = { [databaseAndStore: string]: (entity: Entity) => void }

class ServiceWorkerClient {
  queue: any[] = []
  changesHooks: Hook<any> = {}

  constructor() {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", () => {

        navigator.serviceWorker.onmessage = (event: any) => {
          const message: WorkerChangeMessage = event.data
          if(message.type === WorkerMessageType.CHANGE) {
            const hook = this.changesHooks[`${message.database}-${message.store}`]
            if(typeof hook !== "undefined") {
              hook(message.entity)
            }
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
