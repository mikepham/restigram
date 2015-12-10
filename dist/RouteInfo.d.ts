import { RouteAuth } from "./RouteAuth";
import { RouteMethod } from "./RouteMethod";
export declare class RouteInfo {
    auth: RouteAuth;
    group: string;
    id: string;
    method: RouteMethod;
    name: string;
    path: string;
    url: string;
}
