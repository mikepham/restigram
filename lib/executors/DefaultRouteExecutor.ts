/// <reference path="../links.d.ts" />

import {} from "bluebird";
import extend = require("extend");
import superagent = require("superagent");
import {SuperAgentRequest, Request, Response} from "superagent";

import {ErrorRouteExecute} from "../exceptions/ErrorRouteExecute";
import {Route} from "../Route";
import {RouteExecutor} from "../interfaces/RouteExecutor";
import {RouteMethod} from "../RouteMethod";
import {RouteParamValues} from "../RouteParamValues";

export class DefaultRouteExecutor implements RouteExecutor {
  private _route: Route;

  public constructor(route: Route) {
  }

  public get route(): Route {
    return this._route;
  }

  public execute();
  public execute(request?: Object, values?: RouteParamValues): Promise<Response> {
    if (request && this.route.method === RouteMethod.Get) {
      throw new ErrorRouteExecute(this.route);
    }

    let header_values: any = values ? this.toObject(values.headers) : null;
    let query_values: any = values ? this.toObject(values.query) : null;
    let url_values: any = values ? this.toObject(values.url) : null;

    let request_data: Object = extend(true, {}, request, this.route.createRequest());
    let request_headers: Object = extend(true, {}, header_values, this.route.createHeaders());

    let method: string = RouteMethod[this.route.method];
    let url: string = this.route.createUrl(query_values, url_values);
    let http: SuperAgentRequest = superagent(method, url);

    if (request_data) {
      http.send(request_data);
    }

    this.setHeaders(http, request_headers);

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

  private toObject(kvp: collections.Dictionary<string, string>): any {
    let values = {};
    kvp.forEach((key, value) => {
      values[key] = value;
    });
    return values;
  }
}