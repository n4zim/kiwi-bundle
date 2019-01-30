import Router, { Route } from "./router";
import Logger from "./logger";
declare class App {
    router: Router;
    logger: Logger;
    constructor(routes?: Route[]);
    getRoutePath(name: number): string;
}
export default App;
