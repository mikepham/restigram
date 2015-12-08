import {RouteMethod} from "./RouteMethod";
import {RouteParam} from "./RouteParam";
import {RouteParamKind} from "./RouteParamKind";
import {RouteParamNotFound} from "./exceptions/RouteParamNotFound";

export class Route {
  private _group: string;
  private _id: string;
  private _method: RouteMethod;
  private _name: string;
  private _params: RouteParam[];
  private _path: string;
  private _url: string;

  constructor(id: string, path: string, method: RouteMethod = RouteMethod.Default, params?: RouteParam[], group?: string, name?: string, url?: string) {
    this._group = group;
    this._id = id;
    this._method = method;
    this._name = name;
    this._params = params;
    this._path = path;
    this._url = url;
  }

  get group(): string {
    return this._group;
  }

  get id(): string {
    return this._id;
  }

  get method(): RouteMethod {
    return this._method;
  }

  get name(): string {
    return this._name || this._id;
  }

  get params(): string[] {
    let names: string[] = [];
    this._params.forEach(x => names.push(x.name));
    return names;
  }

  get path(): string {
    return this._path;
  }

  get url(): string {
    return this._url;
  }

  public createHeaders(context?: Object): Object {
    let headers: Object = {};
    this.headers().forEach(header => {
      headers[header.name] = header.resolve(context);
    });
    return headers;
  }

  public createRequest(context?: Object, includeOptionals?: boolean): Object {
    let request: Object = {};
    this.request().forEach(param => {
      let included = param.optional && !includeOptionals ? false : true;
      if (included) {
        request[param.name] = param.resolve(context);
      }
    });
    return request;
  }

  public createUrl(): string {
    return this._url;
  }

  public headers(): RouteParam[] {
    let params: RouteParam[] = [];
    this._params.forEach(param => {
      if (param.kind === RouteParamKind.Header) {
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
    throw new RouteParamNotFound(name);
  }

  public query(): RouteParam[] {
    let params: RouteParam[] = [];
    this._params.forEach(param => {
      if (param.kind === RouteParamKind.Query) {
        params.push(param);
      }
    });
    return params;
  }

  public request(): RouteParam[] {
    let params: RouteParam[] = [];
    this._params.forEach(param => {
      if (param.kind === RouteParamKind.Request) {
        params.push(param);
      }
    });
    return params;
  }

  public variables(): RouteParam[] {
    let params: RouteParam[] = [];
    this._params.forEach(param => {
      if (param.kind === RouteParamKind.Variable) {
        params.push(param);
      }
    });
    return params;
  }
}