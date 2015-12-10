/// <reference path="../../lib/links.d.ts" />
import { SuperAgentRequest } from "superagent";
import { Route } from "../Route";
import { RouteExecutor } from "../interfaces/RouteExecutor";
export declare class DefaultRouteExecutor implements RouteExecutor {
    private _route;
    constructor(route: Route);
    route: Route;
    execute(): any;
    protected setHeaders(http: SuperAgentRequest, headers: Object): void;
    private toObject(kvp);
}
