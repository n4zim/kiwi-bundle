import { History } from 'history';
import Route from "./routes/Route";
import Logger from "./logger";
import { LinkAction } from "./routes/Link";
export default class Client {
    pages: Route[];
    pagesIndexes: {
        [name: string]: number;
    };
    logger: Logger;
    history: History;
    constructor(pages: Route[]);
    getLinkAction(name: number): LinkAction;
    renderReactRouter(): JSX.Element;
}
