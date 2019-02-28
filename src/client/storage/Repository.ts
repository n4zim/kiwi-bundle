import { EntityConstructor } from "./Entity"
import logger from "../logger"

interface RepositoryData<Entity> {
  findAll: () => Promise<Entity[]>
  forEach: (action: Function) => void // Promise<Entity[]>
}

interface RepositoryParams<Entity> {
  name: string
  entity: EntityConstructor
  onLoad?: (data: Repository<Entity>) => void
}
export default class Repository<Entity = {}> implements RepositoryParams<Entity> {
  name: string
  entity: EntityConstructor
  onLoad?: (data: Repository<Entity>) => void
  store?: IDBObjectStore

  constructor(params: RepositoryParams<Entity>) {
    this.name = params.name
    this.entity = params.entity
    this.onLoad = params.onLoad
    logger.logInfo(this, `Loaded ${this.name} entities`)
  }

  private handleRequest(request: IDBRequest): Promise<Entity[]> {
    return new Promise(resolve => {
      request.onsuccess = () => {
        resolve(request.result)
      }
    })
  }

  findAll(): Promise<Entity[]> {
    return new Promise((resolve, reject) => {
      if(typeof this.store !== "undefined") {
        resolve(this.handleRequest(this.store.getAll()))
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

}
