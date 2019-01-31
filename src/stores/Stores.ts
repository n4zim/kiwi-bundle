import Store from "./Store"

export default class Stores {
  list: Store[]
  indexes: { [name: string]: number } = {}

  constructor(stores: Store[]) {
    this.list = stores
    stores.forEach((store, index) => {
      this.indexes[store.name] = index
    })
  }

}
