import {Route} from "../Route";
import {RouteMethod} from "../RouteMethod";
import {Utils} from "../Utils";

export class ErrorRouteExecute extends Error {
  constructor(route: Route) {
    super(Utils.format("Route '{0}' using method '{1}' does not accept a request object.", [route.id, RouteMethod[route.method]]));
  }
}