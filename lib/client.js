"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var history_1 = require("history");
var logger_1 = __importDefault(require("./logger"));
var Client = (function () {
    function Client(pages) {
        var _this = this;
        this.pagesIndexes = {};
        this.logger = new logger_1.default();
        this.history = history_1.createBrowserHistory();
        this.pages = pages;
        pages.forEach(function (page, index) {
            _this.pagesIndexes[page.name] = index;
        });
        var renderDiv = document.getElementById("render");
        react_dom_1.render(this.renderReactRouter(), renderDiv);
    }
    Client.prototype.getLinkAction = function (name) {
        var _this = this;
        var route = this.pages[this.pagesIndexes[name]];
        return {
            path: route.path,
            call: function () { _this.history.push(route.path); },
        };
    };
    Client.prototype.renderReactRouter = function () {
        var _this = this;
        return React.createElement(react_router_dom_1.Router, { history: this.history },
            React.createElement(react_router_dom_1.Switch, null,
                this.pages.map(function (route) {
                    return React.createElement(react_router_dom_1.Route, { exact: true, key: "route" + route.name, path: route.path, render: function (props) {
                            return React.createElement(route.component, __assign({}, props, { client: _this }));
                        } });
                }),
                React.createElement(react_router_dom_1.Redirect, { from: "*", to: "/" })));
    };
    return Client;
}());
exports.default = Client;
