import { Component, ReactNode } from "react";
import { RouteComponentProps } from "react-router-dom";
interface WebPageType {
    getTitle?: () => string;
    render: () => ReactNode;
}
export default class WebPage<Params = {}> extends Component<RouteComponentProps> implements WebPageType {
    params: Params;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
}
export interface WebPageConstructor {
    new (props?: any): WebPage;
}
export {};
//# sourceMappingURL=WebPage.d.ts.map