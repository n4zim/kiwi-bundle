import { WorkerMessageChangeType } from "../../sw/types";
declare class ServiceWorkerClient {
    private isCompatible;
    private changesHooks;
    constructor();
    load(): void;
    forceCacheUpdate(): void;
    private postMessage;
    private onCacheMessage;
    private onChangeMessage;
    propagateChanges<Entity>(type: WorkerMessageChangeType, databaseName: string, storeName: string, entity: Entity): void;
    addChangesHook<Entity>(database: string, store: string, action: (entity: Entity) => void): void;
}
export declare const serviceWorkerClient: ServiceWorkerClient;
export {};
//# sourceMappingURL=sw.d.ts.map