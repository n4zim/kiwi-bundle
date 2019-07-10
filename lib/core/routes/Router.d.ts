/// <reference types="react" />
import { LinkAction } from "./Link";
import Redirect from "./Redirect";
import Route from "./Route";
interface RouteAuthentifier {
    unauthRedirectPathForRoute: (route: Route) => string;
    currentUserHasAccessToRoute: (route: Route) => boolean;
}
interface RouterOptions {
    routeAuthentifier?: RouteAuthentifier;
}
export default class Router {
    routes: (Route | Redirect)[];
    options: RouterOptions;
    indexes: {
        [name: string]: number;
    };
    constructor(routes?: (Route | Redirect)[], options?: RouterOptions);
    getLinkAction(path: string): LinkAction;
    getParamsAsString(prefix?: string | string[]): string[];
    getParametersAsObject(prefix?: string | string[]): {
        [key: string]: string[];
    };
    getParametersAsArray(prefix?: string | string[]): {
        key: string;
        values: string[];
    }[];
    private getReactRoutes;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=Router.d.ts.map