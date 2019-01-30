import { WebPageConstructor } from "../components";
export default class Route {
    name: number;
    path: string;
    component: WebPageConstructor;
    constructor(name: number, path: string, component: WebPageConstructor);
}
