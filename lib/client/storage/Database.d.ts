import Repository from "./Repository";
declare class Database {
    name: string;
    private repositories;
    constructor(name: string, repositories: Repository[]);
    onUpgradeNeeded(database: IDBDatabase): void;
    onSuccess(database: IDBDatabase): void;
}
export default Database;
