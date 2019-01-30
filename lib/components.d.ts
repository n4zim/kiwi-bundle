import * as React from "react";
import App from "./app";
declare class WebComponent<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
    constructor(props: any);
}
declare class WebPage<P = {}, S = {}, SS = any> extends WebComponent<P, S, SS> {
    kiwi: App;
    constructor(app: App, props?: any);
}
interface WebPageConstructor<P = {}, S = {}, SS = any> {
    new (app: App, props?: any): WebPage<P, S, SS>;
}
export { WebComponent, WebPage, WebPageConstructor, };
