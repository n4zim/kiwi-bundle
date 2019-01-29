import * as React from "react";
interface WebComponentType {
    render(): React.ReactNode;
}
declare class WebComponent extends React.Component implements WebComponentType {
}
export { WebComponentType, WebComponent, };
