import Router from "../routes/Router";
import { stringsFunction } from "../i18n/types";
import "./sw";
export default class Client {
    private hotModuleEnabled;
    private language;
    constructor(router: Router);
    private loadHotModule;
    i18n(data: string | object | stringsFunction, count?: number, vars?: {}): string;
}
//# sourceMappingURL=index.d.ts.map