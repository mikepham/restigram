/// <reference path="../../typings/bluebird/bluebird.d.ts" />
/// <reference path="../../typings/superagent/superagent.d.ts" />
import { Response } from "superagent";
import { Route } from "../Route";
export interface RouteExecutor {
    execute(request?: Object, values?: {
        query: Object;
        params: Object;
        url: Object;
    }, headers?: Object): Promise<Response>;
    route: Route;
}
