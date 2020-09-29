
export interface TreeObject<Data> {
  id: string|string[]
  data: Data|Data[]
  children?: TreeObject<Data>|TreeObject<Data>[]
}
