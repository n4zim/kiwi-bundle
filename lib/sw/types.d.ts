export declare enum WorkerMessageType {
    CACHE = 0,
    CHANGE = 1
}
interface WorkerMessage {
    type: WorkerMessageType;
}
export interface WorkerCacheMessage extends WorkerMessage {
    scripts?: string[];
}
export declare enum WorkerMessageChangeType {
    CREATE = 0,
    UPDATE = 1,
    DELETE = 2
}
export interface WorkerChangeMessage<Entity = any> extends WorkerMessage {
    change: WorkerMessageChangeType;
    database: string;
    store: string;
    entity: Entity;
}
export {};
//# sourceMappingURL=types.d.ts.map