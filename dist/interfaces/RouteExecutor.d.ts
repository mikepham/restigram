/// <reference path="../../lib/links.d.ts" />
import { Response } from "superagent";
import { Route } from "../Route";
import { RouteParamValues } from "../RouteParamValues";
export interface RouteExecutor {
    execute(): any;
    execute(values: RouteParamValues): any;
    execute(request?: Object, values?: RouteParamValues): Promise<Response>;
    route: Route;
}
