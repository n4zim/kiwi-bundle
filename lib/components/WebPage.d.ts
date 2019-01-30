import { Component } from "react";
import App from "../app";
export default class WebPage<P = {}, S = {}, SS = any> extends Component<P, S, SS> {
    kiwi: App;
    constructor(app: App, props?: any);
}
export interface WebPageConstructor<P = {}, S = {}, SS = any> {
    new (app: App, props?: any): WebPage<P, S, SS>;
}
