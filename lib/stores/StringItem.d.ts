import Store from "./Store";
export default class StringItem {
    list: Store[];
    indexes: {
        [name: string]: number;
    };
    constructor(stores: Store[]);
}
