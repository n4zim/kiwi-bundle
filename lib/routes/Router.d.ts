import * as React from "react";
import { History } from 'history';
import App from "../app";
import Route from './Route';
import { WebPageConstructor } from "../components/WebPage";
export default class Router {
    app: App;
    routes: Route[];
    history: History;
    paths: {
        [name: string]: string;
    };
    constructor(app: App, routes?: Route[]);
    injectKiwi(component: WebPageConstructor, props: any): React.ReactNode;
    render(): JSX.Element;
}
