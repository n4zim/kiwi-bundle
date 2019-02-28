import Repository from "./Repository"
import { EntityConstructor } from "./Entity"
import logger from "../logger"

type StorageName = string

class Storage {
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
      logger.logSuccess(this, "IndexedDB connected", event)
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
      repository.newTransaction = () => {
        return database.transaction(repository.name, "readwrite").objectStore(repository.name)
      }

      repository.handleQueue()

      logger.logInfo(repository, `Repository for ${this.name} loaded`)

      if(--check === 0) {
        logger.logInfo(
          this,
          `${this.repositories.length} repositor${this.repositories.length === 1 ? "y" : "ies"} has been loaded`
        )
      }
    })
  }

}

export default Storage
