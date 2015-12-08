import {RouteMethod} from "../RouteMethod";

export class InvalidExecutorMethod extends Error {
  constructor(id: string, method: RouteMethod) {
    super("Route '" + id + "' cannot pass a request object when calling method '" + RouteMethod[method] + "'.");
  }
}