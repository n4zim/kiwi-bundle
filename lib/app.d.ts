import Router, { Route } from "./router";
import Logger from "./logger";
declare class App {
    router: Router;
    logger: Logger;
    constructor(routes?: Route[]);
}
export default App;
