export type RecipeId = string
export type CollectionId = string
export type DocumentId = string

export type Line = any
export type Lines = Line[]

export class Request {
  static URL = "http://localhost:8040/"

  private static request(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(this.URL + path).then(result => result.json()).then(result => {
        if(typeof result.error === "undefined") {
          resolve(result)
        } else {
          reject(result)
        }
      }, reject)
    })
  }

  static getDocument(recipe: RecipeId, document: DocumentId) {
    return this.request(`recipes/${recipe}/documents/${document}`)
  }

  static getLines(recipe: RecipeId, collection: CollectionId, filters?: any): Promise<Lines> {
    return this.request(`recipes/${recipe}/collections/${collection}/lines`)
  }
}
