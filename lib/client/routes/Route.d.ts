import { WebPageConstructor } from "../components/WebPage";
export default class Route {
    path: string;
    component: WebPageConstructor;
    constructor(path: string, component: WebPageConstructor);
}
