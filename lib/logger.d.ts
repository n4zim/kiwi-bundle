interface LoggerParams {
    enable: boolean;
}
declare class Logger {
    enabled: boolean;
    constructor(params?: LoggerParams);
    private log;
    logSuccess(data: any): void;
    logError(data: any): void;
    logInfo(data: any): void;
}
export default Logger;
