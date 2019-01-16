declare enum Platform {
    WEB = "web",
    ANDROID = "android",
    IOS = "ios",
    LINUX = "linux",
    WINDOWS = "windows",
    MACOS = "macos"
}
interface ConfigParams {
    version: string;
    platforms: Platform[];
}
declare class Config implements ConfigParams {
    version: string;
    platforms: Platform[];
    constructor(json?: ConfigParams);
    write(projectDir: string): void;
}
export { Config as default, ConfigParams, Platform, };
