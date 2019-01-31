import { History } from 'history';
import Route from './Route';
import { LinkAction } from "./Link";
export default class Router {
    pages: Route[];
    history: History;
    indexes: {
        [name: string]: number;
    };
    constructor(pages?: Route[]);
    getLinkAction(name: number): LinkAction;
    render(): JSX.Element;
}
