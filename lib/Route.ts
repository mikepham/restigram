import {RouteMethod} from "./RouteMethod";
import {RouteParam} from "./RouteParam";
import {RouteParamKind} from "./RouteParamKind";
import {RouteParamNotFound} from "./RouteParamNotFound";

export class Route {
  private _group: string;
  private _id: string;
  private _method: RouteMethod;
  private _name: string;
  private _params: RouteParam[];
  private _path: string;
  private _url: string;

  /**
   * Initializes a new instance of {Route}.
   * @constructor
   * @param {string} id - unique identifier for the route
   * @param {string} method - HTTP method to use when calling the route
   * @param {string} path - path to the specified route resource
   * @param {string} url - url to the route.
   * @param {RouteParam[]} params - parameters for the route including headers, request, query, and variable
   * @param {string} group - group to use when generating the API
   * @param {string} name - name of the route
   */
  constructor(id: string, method: RouteMethod, path: string, url: string, params: RouteParam[], group?: string, name?: string) {
    this._group = group;
    this._id = id;
    this._method = method;
    this._name = name;
    this._params = params;
    this._path = path;
    this._url = url;
  }

  /**
   * Gets the group to assign the route to when generating API methods.
   */
  get group(): string {
    return this._group;
  }

  /**
   * Gets the unique identifier for the route.
   */
  get id(): string {
    return this._id;
  }

  /**
   * Gets the method used for the route.
   */
  get method(): RouteMethod {
    return this._method;
  }

  /**
   * Gets the name of the route.
   */
  get name(): string {
    return this._name;
  }

  /**
   * Gets the names of the parameters.
   */
  get params(): string[] {
    let names: string[] = [];
    this._params.forEach(x => names.push(x.name));
    return names;
  }

  /**
   * Gets the path for the route.
   */
  get path(): string {
    return this._path;
  }

  /**
   * Gets the url for the route.
   */
  get url(): string {
    return this._url;
  }

  /**
   * Returns an object that represents a request to the route.
   * @param {any} context - a context object to use when walking source strings
   */
  public createRequest(context?: any, includeOptionals?: boolean): any {
    let request: any = {};
    this.request().forEach(param => {
      let included = param.optional && !includeOptionals ? false : true;
      if (included) {
        request[param.name] = param.resolve(context)
      }
    });
    return request;
  }

  /**
   * Returns a URL that has been parsed and replaced with values.
   */
  public createUrl(): string {
    return this._url;
  }

  /**
   * Gets the collection of header parameters.
   */
  public headers(): RouteParam[] {
    let params: RouteParam[] = [];
    this._params.forEach(param => {
      if (param.kind === RouteParamKind.Header) {
        params.push(param);
      }
    });
    return params;
  }

  /**
   * Gets the specified named parameter.
   */
  public param(name: string): RouteParam {
    for (let index = 0; index < this._params.length; index++) {
      let param = this._params[index];
      if (param.name === name) {
        return param;
      }
    }
    throw new RouteParamNotFound(name);
  }

  /**
   * Gets the collection of query parameters.
   */
  public query(): RouteParam[] {
    let params: RouteParam[] = [];
    this._params.forEach(param => {
      if (param.kind === RouteParamKind.Query) {
        params.push(param);
      }
    });
    return params;
  }

  /**
   * Gets the collection of request parameters.
   */
  public request(): RouteParam[] {
    let params: RouteParam[] = [];
    this._params.forEach(param => {
      if (param.kind === RouteParamKind.Request) {
        params.push(param);
      }
    });
    return params;
  }

  /**
   * Gets the collection of variable parameters.
   */
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