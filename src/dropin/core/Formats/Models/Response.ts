
export interface ModelResponse<Id = string> {
  id: Id
}

export interface ModelResponseUpdatable {
  createdAt: number
  updatedAt: number
}
