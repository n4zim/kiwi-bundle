import { isUndefined } from "util"
import Repository from "./Repository"

enum StorageState { INIT, READY, BUSY }

class Storage {
  state: StorageState = StorageState.INIT
  entities: { [name: string]: any } = {}

  constructor(repositories: Repository[]) {
    repositories.forEach(repository => {
      // Put storage inside entity class
      repository.entity.prototype.storage = this

      // Add a record inside the cache
      this.entities[repository.name] = repository.entity

      // Load the repository
      repository.load(this)
    })

    this.state = StorageState.READY
  }

  findAll(name: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if(isUndefined(this.entities[name])) {
        reject(`The entity "${name}" was not found`)
      } else {
        resolve([
          new this.entities[name]({ text: "OK" })
        ])
      }
    })
  }

  /*state: StorageState = StorageState.INIT
  insertDemoData: boolean = true

  constructor() {
    EntityList.forEach((entity: EntityDescriptionWithStore) => {
      entity.store = localForage.createInstance({
        driver: localForage.LOCALSTORAGE,
        name: entity.name,
        version: entity.migrations.version,
      })
      this.entities[entity.name] = entity
      if(this.insertDemoData) {
        if(entity.name === EntityName.USER) {
          this.setById(EntityName.USER, "demo", new User({ name: "Demo", password: "test" }))
        } else {
        }
      }
    })
  }

  private getStore(entityName: EntityName): Promise<LocalForage> {
    return new Promise((resolve, reject) => {
      if(isUndefined(this.entities[entityName])) {
        reject(`The entity "${entityName}" was not found`)
      } else if(isUndefined(this.entities[entityName].store)) {
        reject(`The store of the "${entityName}" entity was not found`)
      } else {
        resolve(this.entities[entityName].store)
      }
    })
  }

  getAll = (entityName: EntityName) => new Promise(resolve => {
    this.getStore(entityName).then(store => {
      resolve(store.keys())
    })
  })

  getById = (entityName: EntityName, id: string) => new Promise(resolve => {
    this.getStore(entityName).then(store => {
      resolve(store.getItem(id))
    })
  })

  setById = (entityName: EntityName, id: string, value: any) => new Promise(resolve => {
    this.getStore(entityName).then(store => {
      resolve(store.setItem(id, value))
    })
  })

  removeById = (entityName: EntityName, id: string) => new Promise(resolve => {
    this.getStore(entityName).then(store => {
      resolve(store.removeItem(id))
    })
  })*/

}

export default Storage
