import {RouteAuth} from "./RouteAuth";
import {RouteMethod} from "./RouteMethod";

export class RouteInfo {
  public auth: RouteAuth = RouteAuth.None;
  public group: string;
  public id: string;
  public method: RouteMethod;
  public name: string;
  public path: string;
  public url: string;
}