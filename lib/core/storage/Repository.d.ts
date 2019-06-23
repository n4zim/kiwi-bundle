import { EntityParams } from "./Entity";
interface RepositoryParams<Entity, EntityData> {
    name: string;
    version: number;
    generateEntity: (params: EntityParams<EntityData>) => Entity;
}
declare type Callback<Entity> = (entity: Entity) => void;
export default class Repository<Entity = {}, EntityData = {}> implements RepositoryParams<Entity, EntityData> {
    name: string;
    version: number;
    generateEntity: (params: EntityParams<EntityData>) => Entity;
    private localCallsQueue;
    private hooksQueue;
    private swCallsQueue;
    private database?;
    constructor(params: RepositoryParams<Entity, EntityData>);
    private handleRequest;
    private generateRequest;
    private execute;
    private propagateToServiceWorker;
    init(database: IDBDatabase): void;
    findAll(): Promise<Entity[]>;
    forEach(action: (entity: Entity) => any): void;
    create(data: EntityData): Promise<Entity>;
    watchForNewEntries(action: Callback<Entity>): void;
}
export {};
//# sourceMappingURL=Repository.d.ts.map