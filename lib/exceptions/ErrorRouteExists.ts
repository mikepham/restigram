import {Route} from "../Route";
import {Utils} from "../Utils";

export class ErrorRouteExists extends Error {
  constructor(route: Route) {
    super(Utils.format("Route {0} already exists.", [route.id]));
  }
}