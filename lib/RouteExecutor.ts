/// <reference path="../typings/bluebird/bluebird.d.ts" />
/// <reference path="../typings/extend/extend.d.ts" />
/// <reference path="../typings/superagent/superagent.d.ts" />

import extend = require("extend");
import request = require("superagent");

import {} from "bluebird";
import {Request, Response} from "superagent";
import {Route} from "./Route";
import {RouteMethod} from "./RouteMethod";
import {InvalidExecutorMethod} from "./exceptions/InvalidExecutorMethod";

export interface RouteExecutor {
  execute(request?: Object, values?: Object, headers?: Object): Promise<Response>;
  route: Route;
}

export class DefaultRouteExecutor implements RouteExecutor {
  private _route: Route;

  constructor(route: Route) {
  }

  get route(): Route {
    return this._route;
  }

  public execute(request?: Object, values?: Object, headers?: Object): Promise<Response> {
    if (request && this.route.method === RouteMethod.Get) {
      throw new InvalidExecutorMethod(this.route.id, this.route.method);
    }

    let request_data = extend(true, {}, request, this.route.createRequest());
    let request_headers = extend(true, {}, headers, this.route.createHeaders());
    let url = this.route.createUrl();
    let http = request.constructor(this.route.method, url);

    return new Promise<Response>((resolve, reject) => {
      return http.end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }
}