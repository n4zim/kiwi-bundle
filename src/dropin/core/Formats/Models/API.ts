import { API, FetchPath } from "../../Code"
import { ModelEntity } from "./Entity"

type ModelAPIFunctions = { [name: string]: (...params: any) => any }

export const ModelAPI = <
  Id extends string,
  Data extends any,
  Response extends any,
  Entity extends ModelEntity<Id, Data>,
>(path: FetchPath, onRetrieve: (data: Response) => Entity, functions: ModelAPIFunctions = {}) => {
  return Object.assign({
    getPath: () => path,
    getAll: () => {
      return API.get<Response>(path).then(responses => {
        return responses.map(response => {
          return onRetrieve(response)
        })
      })
    },
    count: (selector?: string) => API.count(path, selector),
    deleteById: (id: Id) => API.deleteById<Id>(path, id),
    getById: (id: Id) => {
      return API.getById<Id, Response>(path, id)
    }
  }, functions)
}
