import Store from "../stores/Store"


export default class StringItem {
  list: Store[]
  indexes: { [name: string]: number } = {}

  constructor(stores: Store[]) {
    this.list = stores
    stores.forEach((store, index) => {
      this.indexes[store.name] = index
    })
  }

}
