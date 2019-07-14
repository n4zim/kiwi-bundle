/// <reference types="webpack-dev-server" />
import Webpack from "webpack";
import { WebpackMode } from "./core";
interface WebpackConfig extends Webpack.Configuration {
    entry: any;
    output: any;
    devServer?: any;
    optimization: any;
}
declare const _default: (rootPath: string, outputPath: string, kiwiConfig: any, mode: WebpackMode) => WebpackConfig;
export default _default;
//# sourceMappingURL=config.d.ts.map