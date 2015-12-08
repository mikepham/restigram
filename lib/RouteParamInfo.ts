import {RouteParamKind} from "./RouteParamKind";

export class RouteParamInfo {
  public kind: RouteParamKind = RouteParamKind.Default;
  public name: string;
  public optional: boolean;
  public source: string;
  public type: string;
}