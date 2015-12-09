import {ErrorRouteExists} from "./exceptions/ErrorRouteExists";
import {DefaultRouteExecutor} from "./executors/DefaultRouteExecutor";
import {RestServiceOptions} from "./RestServiceOptions";
import {Route} from "./Route";
import {RouteExecutor} from "./interfaces/RouteExecutor";
import {Utils} from "./Utils";

export class RestServiceBuilder {
  private _options: RestServiceOptions;
  private _routes: Route[] = [];

  public constructor(options: RestServiceOptions) {
    this._options = options;
  }

  public get count(): number {
    return this._routes.length;
  }

  public get options(): RestServiceOptions {
    return this._options;
  }

  public add(route: Route): RestServiceBuilder {
    Utils.contains(this._routes, null, (index, value, array) => {
      if (value.id === route.id) {
        throw new ErrorRouteExists(route);
      }
      return false;
    });
    this._routes.push(route);
    return this;
  }

  public build(url: string): Object {
    let api = {};
    this._routes.forEach(route => {
      if (route.url !== url) {
        route.url = url;
      }
      api[route.group || route.name][route.method] = this.route(route).execute;
    });
    return api;
  }

  public exists(id: string): boolean {
    for (let index = 0; index < this._routes.length; index++) {
      let route = this._routes[index];
      if (route.id === id) {
        return true;
      }
    }
  }

  protected route(route: Route): RouteExecutor {
    return new DefaultRouteExecutor(route);
  }
}