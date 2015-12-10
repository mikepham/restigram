/// <reference path="../typings/tsd.d.ts" />
import { RouteAuth } from "./RouteAuth";
import { RouteInfo } from "./RouteInfo";
import { RouteMethod } from "./RouteMethod";
import { RouteParam } from "./RouteParam";
export declare class Route {
    private _auth;
    private _group;
    private _id;
    private _method;
    private _name;
    private _params;
    private _path;
    private _url;
    constructor(info: RouteInfo, params?: RouteParam[]);
    auth: RouteAuth;
    group: string;
    id: string;
    method: RouteMethod;
    name: string;
    params: string[];
    path: string;
    url: string;
    static load(instance: RouteInfo): Route;
    static save(route: Route): RouteInfo;
    createHeaders(context?: Object): Object;
    createRequest(context?: Object, includeOptionals?: boolean): Object;
    createUrl(query?: Object, url?: Object): string;
    getHeaderParameters(): RouteParam[];
    getQueryParameters(): RouteParam[];
    getRequestParameters(): RouteParam[];
    getUrlParameters(): RouteParam[];
    param(name: string): RouteParam;
}
