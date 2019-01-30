export default interface RouteAction {
    path: string;
    call: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
