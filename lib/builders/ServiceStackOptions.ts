import {RestServiceOptions} from "../../lib/RestServiceOptions";
import {RouteAuth} from "../../lib/RouteAuth";

export class ServiceStackOptions extends RestServiceOptions {
  public authRouteName: string = "Auth";
  public authRouteAuth: RouteAuth = RouteAuth.None;
  public mappings: Object = {};

  constructor() {
    super();
  }
}