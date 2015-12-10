/// <reference path="links.d.ts" />

import {} from "bluebird";

import {ErrorRouteExists} from "./exceptions/ErrorRouteExists";
import {DefaultRouteExecutor} from "./executors/DefaultRouteExecutor";
import {RestServiceOptions} from "./RestServiceOptions";
import {Route} from "./Route";
import {RouteExecutor} from "./interfaces/RouteExecutor";
import {RouteMethod} from "./RouteMethod";
import {Utils} from "./Utils";

export class RestServiceBuilder {
  private _api: any = {};
  private _options: RestServiceOptions;
  private _routes: { route: Route, executor: RouteExecutor }[] = [];

  public constructor(options: RestServiceOptions) {
    this._options = options;
  }

  public get count(): number {
    return this._routes.length;
  }

  public get options(): RestServiceOptions {
    return this._options;
  }

  protected get api(): any {
    return this._api;
  }

  public add(route: Route): RestServiceBuilder {
    Utils.contains(this._routes, null, (index, value, array) => {
      if (value.id === route.id) {
        throw new ErrorRouteExists(route);
      }
      return false;
    });
    this._routes.push({ route: route, executor: this.route(this._api, route) });
    return this;
  }

  public build(url?: string): Promise<any> {
    this._api = {};

    if (url) {
      this._routes.forEach(route => {
        if (route.route.url !== url) {
          route.route.url = url;
        }
        this.route(this._api, route.route);
      });
    }
    return Promise.resolve(this._api);
  }

  public exists(id: string): boolean {
    for (let index = 0; index < this._routes.length; index++) {
      let route = this._routes[index];
      if (route.route.id === id) {
        return true;
      }
    }
  }

  public group(name: string): Route[] {
    let routes: Route[] = [];
    this._routes.forEach(route => {
      if (route.route.group === name) {
        routes.push(route.route);
      }
    });
    return routes;
  }

  protected route(api: any, route: Route): RouteExecutor {
    let executor = new DefaultRouteExecutor(route);
    let group = route.group || route.id;
    let method = RouteMethod[route.method];

    if (!api[group]) {
      api[group] = {};
    }

    api[group][method ? method.toLowerCase() : method] = executor.execute;
    return executor;
  }
}