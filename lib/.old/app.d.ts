import Router from "./Router";
import Route from "../routes/Route";
import Logger from "../logger";
import { LinkAction } from "../routes/Link";
import Store from "../stores/Store";
declare class App {
    router: Router;
    stores: Store[];
    logger: Logger;
    constructor(routes?: Route[], stores?: Store[]);
    getLinkAction(name: number): LinkAction;
    getStore(name: number): void;
}
export default App;
