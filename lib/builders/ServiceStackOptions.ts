import {RestServiceOptions} from "../RestServiceOptions";
import {RouteAuth} from "../RouteAuth";

export class ServiceStackOptions extends RestServiceOptions {
  public authRouteName: string = "Auth";
  public authRouteAuth: RouteAuth = RouteAuth.None;
  public mappings: Object = {};

  constructor() {
    super();
  }
}