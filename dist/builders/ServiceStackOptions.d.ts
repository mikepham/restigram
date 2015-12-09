import { RestServiceOptions } from "../../lib/RestServiceOptions";
import { RouteAuth } from "../../lib/RouteAuth";
export declare class ServiceStackOptions extends RestServiceOptions {
    authRouteName: string;
    authRouteAuth: RouteAuth;
    mappings: Object;
    constructor();
}
