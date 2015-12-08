import {RouteAuth} from "./RouteAuth";

export class RestServiceOptions {
  public alwaysIncludeEmptyRequestParams: boolean = false;
  public defaultRouteAuthentication: RouteAuth = RouteAuth.None;

  public constructor() {
  }
}