/// <reference types="react" />
import { LinkAction } from "./Link";
import Redirect from "./Redirect";
import Route from "./Route";
export default class Router {
    routes: (Route | Redirect)[];
    indexes: {
        [name: string]: number;
    };
    constructor(routes?: (Route | Redirect)[]);
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
//# sourceMappingURL=Router.d.ts.map