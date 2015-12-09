/// <reference path="../../typings/bluebird/bluebird.d.ts" />
/// <reference path="../../typings/extend/extend.d.ts" />
/// <reference path="../../typings/superagent/superagent.d.ts" />
import { SuperAgentRequest, Response } from "superagent";
import { Route } from "../Route";
import { RouteExecutor } from "../interfaces/RouteExecutor";
export declare class DefaultRouteExecutor implements RouteExecutor {
    private _route;
    constructor(route: Route);
    route: Route;
    execute(request?: Object, values?: {
        query: Object;
        params: Object;
        url: Object;
    }, headers?: Object): Promise<Response>;
    protected setHeaders(http: SuperAgentRequest, headers: Object): void;
}
