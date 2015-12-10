import { RestServiceOptions } from "../RestServiceOptions";
import { RouteAuth } from "../RouteAuth";
export declare class ServiceStackOptions extends RestServiceOptions {
    authRouteName: string;
    authRouteAuth: RouteAuth;
    mappings: Object;
    constructor();
}
