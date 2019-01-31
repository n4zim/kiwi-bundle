import { History } from 'history';
import App from "./app";
import Route from '../routes/Route';
export default class Router {
    app: App;
    routes: Route[];
    history: History;
    indexes: {
        [name: string]: number;
    };
    constructor(app: App, routes?: Route[]);
    getByName(name: number): Route;
    private injectKiwi;
    render(): JSX.Element;
}
