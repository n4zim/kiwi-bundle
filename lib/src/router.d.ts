import React from "react";
import { History } from 'history';
declare class Route {
    name: string;
    path: string;
    component: React.Component;
    constructor(name: string, path: string, component: React.Component);
}
declare class Router {
    routes: Route[];
    history: History;
    paths: {
        [name: string]: string;
    };
    constructor(routes?: Route[]);
    getRoutePath(name: string): string;
    render(): JSX.Element;
}
export { Router as default, Route, };
