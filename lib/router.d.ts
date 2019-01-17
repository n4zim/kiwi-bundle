declare class Component {
}
declare class Route {
    name: string;
    path: string;
    component: Component;
    constructor(name: string, path: string, component: Component);
}
interface RouterParams {
    routes: Route[];
}
declare class Router implements RouterParams {
    routes: Route[];
    constructor(routes?: Route[]);
}
export { Router as default, Route, };
