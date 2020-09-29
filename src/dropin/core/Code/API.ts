import nodeFetch, { Response as NodeFetchResponse } from "node-fetch"
import { Token } from "../Auth/Tokens/entity"
import { ModelResponse } from "../Formats/Models/Response"

interface FetchInit {
  method: FetchMethod
  headers: { [name: string]: string }
  body?: any
}

export enum FetchMethod {
  PUT = "PUT",
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export type FetchParams = { [name: string]: string }

export type FetchPath = string[]

export class API {
  private static URL = "https://api.dropin.cloud"
  private static VERSION = 1
  private static TOKEN: Token

  private static convertPath(path: string|FetchPath, concat?: string|FetchPath): string {
    let finalPath = Array.isArray(path) ? path.join("/") : path
    if(typeof concat !== "undefined") {
      finalPath += "/" + this.convertPath(concat)
    }
    return finalPath
  }

  private static fetch(url: string, init: FetchInit): Promise<NodeFetchResponse | Response> {
    if(typeof nodeFetch !== "undefined") {
      return nodeFetch(url, init)
    }
    return fetch(url, init)
  }

  static request<Output>(method: FetchMethod, path: string|FetchPath, params: FetchParams = {}, body?: any): Promise<Output> {
    let init: FetchInit = { method, headers: { "content-type": "application/json" } }

    // Token
    if(typeof this.TOKEN !== "undefined") {
      init.headers["Authorization"] = "Bearer " + this.TOKEN.short
    }

    // Body
    if(typeof body !== "undefined") {
      init.body = JSON.stringify(body)
    }

    // String parameters
    let stringParams = ""
    const keys = Object.keys(params)
    if(keys.length !== 0) {
      stringParams = `?${keys.filter(k => typeof params[k] !== "undefined").map(k => k + "=" + params[k]).join("&")}`
    }

    // URL
    const url = encodeURI(`${this.URL}/v${this.VERSION}/${this.convertPath(path)}${stringParams}`)

    // Fetch
    return new Promise((resolve, reject) => {
      return this.fetch(url, init)
        .then(result => result.json())
        .then(result => {
          if(typeof result.error === "undefined") {
            resolve(result)
          } else {
            reject(result.error)
          }
        }, reject)
    })
  }

  static enableLocalMode(port: number = 8040, address: string = "localhost", https: boolean = false) {
    this.URL = `http${https ? "s" : ""}://${address}:${port}`
  }

  static setToken(token: Token) {
    this.TOKEN = token
  }

  static create<Data extends any, Response extends any>(path: FetchPath, data: Data): Promise<Response> {
    if(typeof (data as any).id !== "undefined") return Promise.reject("Id already exists")
    return this.request<Response>(FetchMethod.PUT, path, {}, data)
  }

  static getById<Id extends string, Response extends any>(path: FetchPath, id: Id) {
    return this.request<Response>(FetchMethod.GET, this.convertPath(path, id))
  }

  static get<Response extends any>(path: FetchPath, selector?: string) {
    let params: FetchParams = {}
    if(typeof selector !== "undefined") params.s = selector
    return this.request<Response[]>(FetchMethod.GET, path, params)
  }

  static count(path: FetchPath, selector?: string) {
    let params: FetchParams = {}
    if(typeof selector !== "undefined") params.s = selector
    return this.request<number>(FetchMethod.GET, path.concat("count"), params)
  }

  static update<Data extends any, Response extends any>(path: FetchPath, data: Data, full: boolean = false) {
    let id = (data as any).id
    if(typeof id === "undefined") return Promise.reject("Id not found")
    let clone = Object.assign({}, data)
    delete (clone as any).id
    return this.request<Response>((full ? FetchMethod.PUT : FetchMethod.PATCH), path.concat(id), {}, clone)
  }

  static archive<Id extends string, Response>(path: FetchPath, id: Id) {
    return this.request<Response>(FetchMethod.POST, path.concat([ id, "archive" ]))
  }

  static unarchive<Id extends string>(path: FetchPath, id: Id) {
    return this.request<"">(FetchMethod.POST, path.concat([ id, "unarchive" ]))
  }

  static deleteById<Id extends string>(path: FetchPath, id: Id) {
    return this.request<"">(FetchMethod.DELETE, path.concat(id))
  }

  static delete(path: FetchPath, selector: string) {
    return this.request<"">(FetchMethod.DELETE, path, { s: selector })
  }

}
