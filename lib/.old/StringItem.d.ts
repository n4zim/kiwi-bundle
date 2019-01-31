import Store from "../stores/Store";
export default class StringItem {
    list: Store[];
    indexes: {
        [name: string]: number;
    };
    constructor(stores: Store[]);
}
