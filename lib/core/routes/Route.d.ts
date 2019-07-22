import { WebPageConstructor } from "../components/WebPage";
interface RouteOptions {
    authLevels?: Array<string>;
}
export declare class Route {
    path: string | string[];
    component: WebPageConstructor;
    options: RouteOptions;
    constructor(path: string | string[], component: WebPageConstructor, options?: RouteOptions);
}
export {};
//# sourceMappingURL=Route.d.ts.map