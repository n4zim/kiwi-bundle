import { EntityParams } from "./Entity"
import logger from "../logger"

interface RepositoryParams<Entity, EntityData> {
  name: string
  version: number
  generateEntity: (params: EntityParams<EntityData>) => Entity
}

type RequestCall = (store: IDBObjectStore) => IDBRequest

interface RepositoryQueueElement {
  requestCall: RequestCall
  resolve: (promise: Promise<any>) => void
}

export default class Repository<Entity = {}, EntityData = {}> implements RepositoryParams<Entity, EntityData> {
  name: string
  version: number
  generateEntity: (params: EntityParams<EntityData>) => Entity
  queue: RepositoryQueueElement[] = []
  newTransaction?: () => IDBObjectStore

  constructor(params: RepositoryParams<Entity, EntityData>) {
    this.name = params.name
    this.version = params.version
    this.generateEntity = params.generateEntity
    logger.logInfo(this, `Loaded ${this.name} entities`)
  }

  private handleRequest(request: IDBRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onerror = () => {
        reject(request)
      }
    })
  }

  private execute(requestCall: RequestCall): Promise<any> {
    return new Promise(resolve => {
      if(typeof this.newTransaction === "undefined") {
        this.queue.push({ requestCall, resolve })
      } else {
        resolve(this.handleRequest(requestCall(this.newTransaction())))
      }
    })
  }

  handleQueue() {
    this.queue.map(({ requestCall, resolve }) => {
      if(typeof this.newTransaction !== "undefined") {
        resolve(this.handleRequest(requestCall(this.newTransaction())))
      }
    })
  }

  findAll(): Promise<Entity[]> {
    return this.execute(store => store.index("updatedAt").getAll())
  }

  forEach(action: (entity: Entity) => any): void {
    this.findAll().then(entities => {
      entities.forEach(entity => {
        action(entity)
      })
    })
  }

  create(data: EntityData): Promise<Entity> {
    return new Promise(resolve => {
      const entity = this.generateEntity({ data })
      resolve(entity)
      this.execute(store => store.put(entity)).then(() => {
        logger.logSuccess(this, `New ${this.name} record`, entity)
      }).catch(() => {
        logger.logError(this, `Record ${this.name} not saved`, entity)
      })
    })
  }

}
