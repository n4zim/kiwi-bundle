import { History } from 'history';
import App from "../app";
import Route from './route';
export default class Router {
    app: App;
    routes: Route[];
    history: History;
    paths: {
        [name: string]: string;
    };
    constructor(app: App, routes?: Route[]);
    render(): JSX.Element;
}
