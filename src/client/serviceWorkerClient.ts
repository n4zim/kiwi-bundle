import Entity from "./storage/Entity"
import Repository from "./storage/Repository"

interface WindowKiwi extends Window {
  kiwi: { sw: string }
}

const W = window as WindowKiwi

export enum WorkerMessageType {
  CHANGE = "c",
}

export enum WorkerMessageChangeType {
  CREATE = "c",
  UPDATE = "u",
  DELETE = "d",
}

export interface WorkerMessage<Entity> {
  type: WorkerMessageType,
  change: WorkerMessageChangeType,
  database: string,
  store: string,
  entity: Entity
}

type Hook<Entity> = { [databaseAndStore: string]: (entity: Entity) => void }

class ServiceWorkerClient {
  // queue: (() => void)[] = []
  changesHooks: Hook<any> = {}

  constructor() {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", () => {

        navigator.serviceWorker.onmessage = (event: any) => {
          const message: WorkerMessage<any> = event.data
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
          console.log("#CLIENT READY")
          // TODO : handle queue
        })
      })
    }
  }

  propagateChanges<Entity, EntityData>(type: WorkerMessageChangeType, repository: Repository<Entity, EntityData>, entity: Entity) {
    const controller = navigator.serviceWorker.controller
    if(controller !== null && typeof repository.database !== "undefined") {
      controller.postMessage({
        type: WorkerMessageType.CHANGE,
        change: type,
        database: repository.database.name,
        store: repository.name,
        entity
      } as WorkerMessage<Entity>)
    }
    // TODO : create queue
  }

  addChangesHook<Entity>(database: string, store: string, action: (entity: Entity) => void) {
    this.changesHooks[`${database}-${store}`] = action
  }

}

export default new ServiceWorkerClient
