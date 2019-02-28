import Repository from "./Repository"
import { EntityConstructor } from "./Entity"
import logger from "../logger"

enum StorageState { INIT, READY, BUSY }

type StorageName = string

class Storage {
  state: StorageState = StorageState.INIT
  name: StorageName
  repositories: Repository[]
  entities: { [name: string]: EntityConstructor } = {}

  constructor(name: StorageName, repositories: Repository[]) {
    this.name = name
    this.repositories = repositories

    const databaseRequest = window.indexedDB.open(name, 1)

    databaseRequest.onerror = () => {
      logger.logError(this, "IndexDB error", event)
    }

    databaseRequest.onupgradeneeded = () => {
      if(databaseRequest.result) {
        this.onUpgradeNeeded(databaseRequest.result)
      }
    }

    databaseRequest.onsuccess = () => {
      logger.logSuccess(this, "IndexDB connected", event)
      this.onSuccess(databaseRequest.result)
    }
  }

  onUpgradeNeeded(database: IDBDatabase) {
    this.repositories.forEach(repository => {
      if(!database.objectStoreNames.contains(repository.name)) {
        database.createObjectStore(repository.name, { keyPath: "id", autoIncrement: true })
        logger.logInfo(this, `Created ${repository.name} store`)
      }
    })
  }

  onSuccess(database: IDBDatabase) {
    let check = this.repositories.length
    this.repositories.forEach(repository => {
      // Put storage inside entity class
      repository.entity.prototype.storage = this

      // Add a record inside the cache
      this.entities[repository.name] = repository.entity

      // Load the repository
      repository.store = database.transaction(repository.name, "readwrite").objectStore(repository.name)
      if(typeof repository.onLoad !== "undefined") repository.onLoad(repository)
      logger.logInfo(repository, `Store for ${this.name} loaded`)

      // Change state
      if(--check === 0) {
        this.state = StorageState.READY
        logger.logInfo(this, "Ready")
      }
    })
  }

  findAll(name: StorageName): Promise<any[]> {
    return new Promise((resolve, reject) => {
    if(this.state !== StorageState.READY) {
      reject(`The database is not ready`)
    } else if(typeof this.entities[name] === "undefined") {
      reject(`The entity "${name}" was not found`)
    } else {
      resolve([])
    }
    })
  }

}

export default Storage
