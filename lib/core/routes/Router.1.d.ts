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
    getParamsAsStrings(prefix?: string | string[]): string[];
    getParamsAsArray(prefix?: string | string[]): any;
    getParamsAsObject(prefix?: string | string[]): any;
    private getReactRoutes;
    render(): JSX.Element;
}
//# sourceMappingURL=Router.1.d.ts.map