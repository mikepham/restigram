/// <reference path="links.d.ts" />

import {} from "urijs";

import {RouteAuth} from "./RouteAuth";
import {RouteInfo} from "./RouteInfo";
import {RouteMethod} from "./RouteMethod";
import {RouteParam} from "./RouteParam";
import {RouteParamCollection} from "./interfaces/RouteParamCollection";
import {RouteParamKind} from "./RouteParamKind";
import {ErrorRouteParamNotFound} from "./exceptions/ErrorRouteParamNotFound";
import {Utils} from "./Utils";

export class Route {
  private _auth: RouteAuth;
  private _group: string;
  private _id: string;
  private _method: RouteMethod;
  private _name: string;
  private _params: RouteParam[];
  private _path: string;
  private _url: string;

  public constructor(info: RouteInfo, params?: RouteParam[]) {
    this._auth = info.auth;
    this._group = info.group;
    this._id = info.id;
    this._method = info.method;
    this._name = info.name;
    this._params = params;
    this._path = info.path;
    this._url = info.url;
  }

  public get auth(): RouteAuth {
    return this._auth;
  }

  public set auth(auth: RouteAuth) {
    this._auth = auth;
  }

  public get group(): string {
    return this._group;
  }

  public get id(): string {
    return this._id;
  }

  public get method(): RouteMethod {
    return this._method;
  }

  public get name(): string {
    return this._name || this._id;
  }

  public get params(): string[] {
    let names: string[] = [];
    this._params.forEach(x => names.push(x.name));
    return names;
  }

  public get path(): string {
    return this._path;
  }

  public get url(): string {
    return this._url;
  }

  public static load(instance: RouteInfo): Route {
    return new Route(instance);
  }

  public static save(route: Route): RouteInfo {
    let info = new RouteInfo();
    info.auth = route._auth;
    info.group = route._group;
    info.id = route._id;
    info.method = route._method;
    info.name = route._name;
    info.path = route._path;
    info.url = route._url;
    return info;
  }

  public createHeaders(context?: Object): Object {
    let headers: Object = {};
    this.getHeaderParameters().forEach(header => {
      headers[header.name] = header.resolve(context);
    });
    return headers;
  }

  public createRequest(context?: Object, includeOptionals?: boolean): Object {
    let request: Object = {};
    this.getRequestParameters().forEach(param => {
      let included = param.optional && !includeOptionals ? false : true;
      if (included) {
        request[param.name] = param.resolve(context);
      }
    });
    return request;
  }

  public createUrl(query?: Object, url?: Object): string {
    let variables = Utils.variables(this.url);
    return this._url;
  }

  public getHeaderParameters(): RouteParam[] {
    let params: RouteParam[] = [];
    this._params.forEach(param => {
      if (param.kind === RouteParamKind.Header) {
        params.push(param);
      }
    });
    return params;
  }

  public getQueryParameters(): RouteParam[] {
    let params: RouteParam[] = [];
    this._params.forEach(param => {
      if (param.kind === RouteParamKind.Query) {
        params.push(param);
      }
    });
    return params;
  }

  public getRequestParameters(): RouteParam[] {
    let params: RouteParam[] = [];
    this._params.forEach(param => {
      if (param.kind === RouteParamKind.Request) {
        params.push(param);
      }
    });
    return params;
  }

  public getUrlParameters(): RouteParam[] {
    let params: RouteParam[] = [];
    this._params.forEach(param => {
      if (param.kind === RouteParamKind.Url) {
        params.push(param);
      }
    });
    return params;
  }

  public param(name: string): RouteParam {
    for (let index = 0; index < this._params.length; index++) {
      let param = this._params[index];
      if (param.name === name) {
        return param;
      }
    }
    throw new ErrorRouteParamNotFound(name);
  }
}