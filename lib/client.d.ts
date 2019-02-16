import Logger from "./logger";
import Router from "./routes/Router";
interface ClientParams {
    router: Router;
    logger: Logger;
}
export default class Client implements ClientParams {
    router: Router;
    logger: Logger;
    constructor(params: ClientParams);
}
export {};
