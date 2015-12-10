/// <reference path="../links.d.ts" />

import {} from "bluebird";

import {Response} from "superagent";
import {Route} from "../Route";
import {RouteParamValues} from "../RouteParamValues";

export interface RouteExecutor {
  execute();
  execute(values: RouteParamValues);
  execute(request?: Object, values?: RouteParamValues): Promise<Response>;
  route: Route;
}