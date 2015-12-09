import {RouteParam} from "../RouteParam";
import {Utils} from "../Utils";

export class ErrorRouteParamNotFound extends Error {
  constructor(name: string) {
    super(Utils.format("Could not find parameter named '{0}'.", [name]));
  }
}