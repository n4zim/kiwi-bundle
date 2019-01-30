import { History } from 'history';
import { WebComponent, WebPageConstructor } from "./components";
import App from "./app";
declare class Route {
    name: number;
    path: string;
    component: WebPageConstructor;
    constructor(name: number, path: string, component: WebPageConstructor);
}
declare class Router {
    app: App;
    routes: Route[];
    history: History;
    paths: {
        [name: string]: string;
    };
    constructor(app: App, routes?: Route[]);
    render(): JSX.Element;
}
interface LinkProps {
    route: number;
}
declare class Link extends WebComponent<LinkProps> {
    onClick(): void;
    render(): JSX.Element;
}
export { Router as default, Route, Link, };
