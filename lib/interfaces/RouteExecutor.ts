/// <reference path="../../typings/tsd.d.ts" />

import {} from "bluebird";

import {Response} from "superagent";
import {Route} from "../Route";

export interface RouteExecutor {
  execute(request?: Object, values?: { query: Object, params: Object, url: Object }, headers?: Object): Promise<Response>;
  route: Route;
}