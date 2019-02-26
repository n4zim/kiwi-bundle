import Storage from "./Storage"
import { EntityConstructor } from "./Entity"

interface RepositoryData {
  all: () => Promise<EntityConstructor[]>
}

interface RepositoryHooks {
  onLoad?: (data: RepositoryData) => void
}

export default class Repository {
  name: string
  entity: EntityConstructor
  hooks: RepositoryHooks

  constructor(name: string, entity: EntityConstructor, hooks: RepositoryHooks = {}) {
    this.name = name
    this.entity = entity
    this.hooks = hooks
  }

  load(storage: Storage) {
    if(typeof this.hooks.onLoad !== "undefined") {
      this.hooks.onLoad({
        all: () => storage.findAll(this.name),
      })
    }
  }

}
