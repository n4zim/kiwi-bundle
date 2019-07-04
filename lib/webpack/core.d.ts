export declare enum WebpackMode {
    PRODUCTION = "production",
    DEVELOPMENT = "development"
}
declare type WebpackCallback = () => any[];
interface WebpackConfigParams {
    common?: any[] | WebpackCallback;
    development?: WebpackCallback;
    production?: WebpackCallback;
}
export default class WebpackConfig implements WebpackConfigParams {
    common?: any[] | WebpackCallback;
    development?: WebpackCallback;
    production?: WebpackCallback;
    constructor(commonOrParams: any[] | WebpackConfigParams);
    generate(mode: WebpackMode): any[];
}
export {};
//# sourceMappingURL=core.d.ts.map