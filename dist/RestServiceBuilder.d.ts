import { RestServiceOptions } from "./RestServiceOptions";
import { Route } from "./Route";
import { RouteExecutor } from "./interfaces/RouteExecutor";
export declare class RestServiceBuilder {
    private _options;
    private _routes;
    constructor(options: RestServiceOptions);
    count: number;
    options: RestServiceOptions;
    add(route: Route): RestServiceBuilder;
    build(url: string): Object;
    exists(id: string): boolean;
    protected route(route: Route): RouteExecutor;
}
