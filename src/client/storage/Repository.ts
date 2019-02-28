import { EntityConstructor, EntityParams } from "./Entity"
import logger from "../logger"

interface RepositoryParams<Entity, EntityData> {
  name: string
  generateEntity: (params: EntityParams<EntityData>) => Entity
  onLoad?: (data: Repository<Entity, EntityData>) => void
}
export default class Repository<Entity = {}, EntityData = {}> implements RepositoryParams<Entity, EntityData> {
  name: string
  generateEntity: (params: EntityParams<EntityData>) => Entity
  onLoad?: (data: Repository<Entity, EntityData>) => void
  getTransaction?: () => IDBObjectStore

  constructor(params: RepositoryParams<Entity, EntityData>) {
    this.name = params.name
    this.generateEntity = params.generateEntity
    this.onLoad = params.onLoad
    logger.logInfo(this, `Loaded ${this.name} entities`)
  }

  private handleRequest(request: IDBRequest): Promise<Entity[]> {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onerror = () => {
        reject(request)
      }
    })
  }

  findAll(): Promise<Entity[]> {
    return new Promise((resolve, reject) => {
      if(typeof this.getTransaction !== "undefined") {
        // resolve(this.handleRequest(this.store().getAll()))
        resolve(this.handleRequest(this.getTransaction().index("updatedAt").getAll()))
      } else {
        reject()
      }
    })
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
      if(typeof this.getTransaction !== "undefined") {
        const entity = this.generateEntity({ data })

        this.handleRequest(this.getTransaction().put(entity))
          .then(() => {
            logger.logSuccess(this, `New ${this.name} record`, entity)
          })
          .catch(() => {
            logger.logError(this, `Record ${this.name} not saved`, entity)
          })

        resolve(entity)
      }
    })
  }

}
