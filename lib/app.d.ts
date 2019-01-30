import Router from "./routes/Router";
import Route from "./routes/Route";
import Logger from "./logger";
import { LinkAction } from "./routes/Link";
declare class App {
    router: Router;
    logger: Logger;
    constructor(routes?: Route[]);
    getLinkAction(name: number): LinkAction;
}
export default App;
