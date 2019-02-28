import { EntityParams } from "./Entity"
import logger from "../logger"
import { transaction } from "mobx";
import { resolve } from "url";

interface RepositoryParams<Entity, EntityData> {
  name: string
  version: number
  generateEntity: (params: EntityParams<EntityData>) => Entity
}
export default class Repository<Entity = {}, EntityData = {}> implements RepositoryParams<Entity, EntityData> {
  name: string
  version: number
  generateEntity: (params: EntityParams<EntityData>) => Entity
  newTransaction?: () => IDBObjectStore

  constructor(params: RepositoryParams<Entity, EntityData>) {
    this.name = params.name
    this.version = params.version
    this.generateEntity = params.generateEntity
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

  private getTransaction(): Promise<IDBObjectStore> {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        logger.logInfo(this, `Waiting for ${this.name} transaction...`)
        if(typeof this.newTransaction !== "undefined") {
          resolve(this.newTransaction())
          clearInterval(interval)
        }
      }, 100)
    })
  }

  findAll(): Promise<Entity[]> {
    return new Promise(resolve => {
      this.getTransaction().then(transaction => {
        resolve(this.handleRequest(transaction.index("updatedAt").getAll()))
      })
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
      const entity = this.generateEntity({ data })
      this.getTransaction().then(transaction => {
        this.handleRequest(transaction.put(entity))
          .then(() => {
            logger.logSuccess(this, `New ${this.name} record`, entity)
          })
          .catch(() => {
            logger.logError(this, `Record ${this.name} not saved`, entity)
          })
        resolve(entity)
      })
    })
  }

}
