import * as React from "react";
import WebComponent from "../components/WebComponent";
export interface LinkAction {
    path: string;
    call: () => void;
}
interface Props {
    action: LinkAction;
    className?: string;
}
export default class Link extends WebComponent<Props> {
    onClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
    render(): JSX.Element;
}
export {};
