"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
//import { Router as ReactRouter, Switch, Route as ReactRoute } from "react-router-dom"
var history_1 = require("history");
var Route = /** @class */ (function () {
    function Route(name, path, component) {
        this.name = name;
        this.path = path;
        this.component = component;
    }
    return Route;
}());
exports.Route = Route;
// -----------------------------------------------
var Router = /** @class */ (function () {
    function Router(routes) {
        if (routes === void 0) { routes = []; }
        var _this = this;
        this.routes = [];
        this.history = history_1.createBrowserHistory();
        this.paths = {};
        this.routes = routes;
        routes.forEach(function (route) {
            _this.paths[route.name] = route.path;
        });
    }
    Router.prototype.getRoutePath = function (name) {
        if (typeof this.paths[name] === "undefined") {
            return "/";
        }
        return this.paths[name];
    };
    Router.prototype.render = function () {
        return react_1.default.createElement("div", null, "OK");
        /*return <ReactRouter history={this.history}>
          <Switch>
            {this.routes.map((route: Route) => {
              return <ReactRoute key={route.name} path={route.path} render={() => {
                if(Meteor.userId()) return <Redirect to={HISTORY.getRoute('index')}/>
                return themeContainer(<AccountPage/>)
              }}/>
            })}
            <Redirect from="*" to="/"/>
          </Switch>
        </ReactRouter>*/
    };
    return Router;
}());
exports.default = Router;
