export default class Store {
    name: number;
    constructor(name: number);
    items: string[];
    currentItem: string;
    changeCurrentItem(value: string): void;
    addCurrentItem(): void;
    reset(): void;
}
