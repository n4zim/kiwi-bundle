export default class Store {
    items: string[];
    currentItem: string;
    changeCurrentItem(value: string): void;
    addCurrentItem(): void;
    reset(): void;
}
