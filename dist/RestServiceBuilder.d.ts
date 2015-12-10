/// <reference path="../lib/links.d.ts" />
import { RestServiceOptions } from "./RestServiceOptions";
import { Route } from "./Route";
import { RouteExecutor } from "./interfaces/RouteExecutor";
export declare class RestServiceBuilder {
    private _api;
    private _options;
    private _routes;
    constructor(options: RestServiceOptions);
    count: number;
    options: RestServiceOptions;
    protected api: any;
    add(route: Route): RestServiceBuilder;
    build(url?: string): Promise<any>;
    exists(id: string): boolean;
    group(name: string): Route[];
    protected route(api: any, route: Route): RouteExecutor;
}
