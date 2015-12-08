import {Utils} from "../Utils";

export class RouteParamNotFound extends Error {
  constructor(name: string) {
    super(Utils.format("Could not find parameter named '{0}'.", [name]));
  }
}