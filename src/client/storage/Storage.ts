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
        const store = database.createObjectStore(repository.name, { keyPath: "id" })
        store.createIndex("createdAt", "createdAt")
        store.createIndex("updatedAt", "updatedAt")

        logger.logInfo(this, `Created ${repository.name} store`)
      }
    })
  }

  onSuccess(database: IDBDatabase) {
    let check = this.repositories.length
    this.repositories.forEach(repository => {
      repository.getTransaction = () => {
        return database.transaction(repository.name, "readwrite").objectStore(repository.name)
      }

      if(typeof repository.onLoad !== "undefined") {
        repository.onLoad(repository)
      }

      logger.logInfo(repository, `Store for ${this.name} loaded`)

      if(--check === 0) {
        this.state = StorageState.READY
        logger.logInfo(this, "Ready")
      }
    })
  }

}

export default Storage
