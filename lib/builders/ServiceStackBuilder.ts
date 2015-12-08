import {RestServiceBuilder} from "../../lib/RestServiceBuilder";
import {ServiceStackOptions} from "./ServiceStackOptions";

export class ServiceStackBuilder extends RestServiceBuilder {
  constructor(options: ServiceStackOptions) {
    super(options);
  }
}