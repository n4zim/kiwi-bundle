import Storage from "./Storage"
import { EntityConstructor } from "./Entity"

interface RepositoryData<Entity> {
  all: () => Promise<Entity[]>
}

interface RepositoryParams<Entity> {
  name: string
  entity: EntityConstructor
  onLoad?: (data: RepositoryData<Entity>) => void
}
export default class Repository<Entity = {}> implements RepositoryParams<Entity> {
  name: string
  entity: EntityConstructor
  onLoad?: (data: RepositoryData<Entity>) => void

  constructor(params: RepositoryParams<Entity>) {
    this.name = params.name
    this.entity = params.entity
    this.onLoad = params.onLoad
  }

  load(storage: Storage) {
    if(typeof this.onLoad !== "undefined") {
      this.onLoad({
        all: () => storage.findAll(this.name),
      })
    }
  }

}
