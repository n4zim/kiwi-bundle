/// <reference types="react" />
import { LinkAction } from "./Link";
import Route from "./Route";
export default class Router {
    routes: Route[];
    indexes: {
        [name: string]: number;
    };
    constructor(routes?: Route[]);
    getLinkAction(path: string): LinkAction;
    private getReactRoutes;
    render(): JSX.Element;
}
