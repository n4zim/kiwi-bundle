import { Component, ReactFragment } from "react";
export interface WebComponentInterface {
    render: ReactFragment;
}
export declare class WebComponent<Props = {}, S = {}, SS = any> extends Component<Props, S, SS> {
    constructor(props: Props);
    componentDidMount(): void;
    componentDidUpdate(): void;
}
export interface WebComponentConstructor {
    new (props?: any): WebComponent;
}
//# sourceMappingURL=WebComponent.d.ts.map