import { Repository } from "./Repository";
export declare class Database {
    name: string;
    private repositories;
    constructor(name: string, repositories: Repository[]);
    onUpgradeNeeded(database: IDBDatabase): void;
    onSuccess(database: IDBDatabase): void;
}
//# sourceMappingURL=Database.d.ts.map