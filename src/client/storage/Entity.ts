import { isUndefined } from "util"
import { uniqueHash, actionWithObjectKey } from "../../utils"
import Storage from "./Storage"

// -------------------------------------------------------------

interface EntityParams {
  id?: string
  createdAt?: Date
  updatedAt?: Date
}

class Entity<Params extends EntityParams = EntityParams> implements EntityParams {
  id?: string
  createdAt?: Date
  updatedAt?: Date

  constructor(params?: Params) {
    if(typeof params !== "undefined" && typeof params.id !== "undefined") {
      this.id = params.id
    } else if(isUndefined(this.id)) {
      this.id = uniqueHash()
    }

    if(isUndefined(this.createdAt) || isUndefined(this.updatedAt)) {
      const date = new Date()
      this.createdAt = date
      this.updatedAt = date
    }
  }

  actionWithParam(params: Params, name: string, action: (data: any) => void) {
    return actionWithObjectKey(params, name, action)
  }

}

export interface EntityConstructor<Params = EntityParams> {
  new(params?: Params): Entity<Params>
}

// -------------------------------------------------------------

class EntityMigrationUpdates {
  constructor(from: number, to: number, action: void) {}
}

class EntityMigrations {
  version: number
  updates: EntityMigrationUpdates[]
  constructor(currentVersion: number, updates: EntityMigrationUpdates[] = []) {
    this.version = currentVersion
    this.updates = updates
  }
}

// -------------------------------------------------------------

interface EntityDescription {
  // name: EntityName
  migrations: EntityMigrations
  createInstance: (params: any) => any
}

// -------------------------------------------------------------

export {
  Entity,
  EntityParams,
  EntityMigrations,
  EntityDescription,
}
