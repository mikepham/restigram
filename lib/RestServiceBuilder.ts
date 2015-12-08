import {RestServiceOptions} from "./RestServiceOptions";
import {Route} from "./Route";
import {RouteExecutor, DefaultRouteExecutor} from "./RouteExecutor";

export class RestServiceBuilder {
  private _options: RestServiceOptions;
  private _routes: Route[] = [];

  constructor(options: RestServiceOptions) {
    this._options = options;
  }

  get count(): number {
    return this._routes.length;
  }

  get options(): RestServiceOptions {
    return this._options;
  }

  public add(route: Route): RestServiceBuilder {
    this._routes.push(route);
    return this;
  }
  
  public build(): Object {
    let api = {};
    this._routes.forEach(route => {
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