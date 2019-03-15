import { Component, ReactNode } from "react";
interface WebPageType {
    getTitle?: () => string;
    render: () => ReactNode;
}
export default class WebPage extends Component implements WebPageType {
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
}
export interface WebPageConstructor {
    new (props?: any): WebPage;
}
export {};
