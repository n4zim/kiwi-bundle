import Logger from "./logger";
import Router from "./routes/Router";
export default class Client {
    router: Router;
    logger: Logger;
    constructor(router: Router);
}
