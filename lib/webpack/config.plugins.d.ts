import WebpackConfig from "./core";
declare const plugins: (path: string, bundlePath: string, kiwiConfig: any) => WebpackConfig;
export default plugins;
