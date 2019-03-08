
export enum WorkerMessageType { CHANGE, CACHE }
export enum WorkerMessageChangeType { CREATE, UPDATE, DELETE }

export interface WorkerMessage {
  type: WorkerMessageType,
}

export interface WorkerChangeMessage<Entity = any> extends WorkerMessage {
  change: WorkerMessageChangeType,
  database: string,
  store: string,
  entity: Entity,
}
