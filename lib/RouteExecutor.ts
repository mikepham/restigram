/// <reference path="../typings/bluebird/bluebird.d.ts" />
/// <reference path="../typings/extend/extend.d.ts" />
/// <reference path="../typings/superagent/superagent.d.ts" />

import extend = require("extend");
import superagent = require("superagent");

import {} from "bluebird";
import {Request, Response} from "superagent";
import {Route} from "./Route";
import {RouteMethod} from "./RouteMethod";
import {InvalidExecutorMethod} from "./exceptions/InvalidExecutorMethod";

export interface RouteExecutor {
  execute(request?: Object, values?: { query: Object, params: Object, url: Object }, headers?: Object): Promise<Response>;
  route: Route;
}

export class DefaultRouteExecutor implements RouteExecutor {
  private _route: Route;

  constructor(route: Route) {
  }

  get route(): Route {
    return this._route;
  }

  public execute(request?: Object, values?: { query: Object, params: Object, url: Object }, headers?: Object): Promise<Response> {
    if (request && this.route.method === RouteMethod.Get) {
      throw new InvalidExecutorMethod(this.route.id, this.route.method);
    }

    let request_data = extend(true, {}, request, this.route.createRequest());
    let request_headers = extend(true, {}, headers, this.route.createHeaders());

    let method = RouteMethod[this.route.method];
    let url = this.route.createUrl(values.query, values.url);
    let http = superagent(method, url);

    if (request_data) {
      http.send(request_data);
    }

    for (let header in request_headers) {
      let value = request_headers[header];
      if (value) {
        http.set(header, value);
      }
    }

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