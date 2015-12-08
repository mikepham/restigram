/// <reference path="../typings/bluebird/bluebird.d.ts" />
/// <reference path="../typings/extend/extend.d.ts" />
/// <reference path="../typings/superagent/superagent.d.ts" />

import extend = require("extend");
import superagent = require("superagent");

import {} from "bluebird";
import {SuperAgentRequest, Request, Response} from "superagent";
import {Route} from "./Route";
import {RouteMethod} from "./RouteMethod";
import {InvalidExecutorMethod} from "./exceptions/InvalidExecutorMethod";

export interface RouteExecutor {
  execute(request?: Object, values?: { query: Object, params: Object, url: Object }, headers?: Object): Promise<Response>;
  route: Route;
}

export class DefaultRouteExecutor implements RouteExecutor {
  private _route: Route;

  public constructor(route: Route) {
  }

  public get route(): Route {
    return this._route;
  }

  public execute(request?: Object, values?: { query: Object, params: Object, url: Object }, headers?: Object): Promise<Response> {
    if (request && this.route.method === RouteMethod.Get) {
      throw new InvalidExecutorMethod(this.route.id, this.route.method);
    }

    let request_data: Object = extend(true, {}, request, this.route.createRequest());
    let request_headers: Object = extend(true, {}, headers, this.route.createHeaders());

    let method: string = RouteMethod[this.route.method];
    let url: string = this.route.createUrl(values.query, values.url);
    let http: SuperAgentRequest = superagent(method, url);

    if (request_data) {
      http.send(request_data);
    }

    this.setHeaders(http, headers);

    return new Promise<Response>((resolve, reject) => {
      return http.end((error: Error, response: Response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  protected setHeaders(http: SuperAgentRequest, headers: Object) {
    for (let header in headers) {
      let value: string = headers[header];

      if (value) {
        if (header.toLowerCase() === "content-type") {
          // BUG: Fixes a bug in browsers where the content-type is sent
          // twice, i.e. "application/json, application/json".
          http.type(value);
        } else {
          http.set(header, value);
        }
      }
    }
  }
}