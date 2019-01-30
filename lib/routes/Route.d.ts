import { WebPageConstructor } from "../components/WebPage";
export default class Route {
    name: number;
    path: string;
    component: WebPageConstructor;
    title?: string;
    constructor(name: number, path: string, component: WebPageConstructor, title?: string);
}
