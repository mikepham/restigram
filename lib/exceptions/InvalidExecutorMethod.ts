import {RouteMethod} from "../RouteMethod";
import {Utils} from "../Utils";

export class InvalidExecutorMethod extends Error {
  constructor(id: string, method: RouteMethod) {
    super(Utils.format("Route '{0}' using method '{1}' does not accept a request object.", [id, RouteMethod[method]]));
  }
}