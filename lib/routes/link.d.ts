import { WebComponent } from "../components";
interface Props {
    route: number;
}
export default class Link extends WebComponent<Props> {
    onClick(): void;
    render(): JSX.Element;
}
export {};
