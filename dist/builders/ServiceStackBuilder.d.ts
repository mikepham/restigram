/// <reference path="../../lib/links.d.ts" />
import { RestServiceBuilder } from "../RestServiceBuilder";
import { ServiceStackOptions } from "./ServiceStackOptions";
export declare class ServiceStackBuilder extends RestServiceBuilder {
    constructor(options: ServiceStackOptions);
    build(url: string): Promise<any>;
    private buildMetadata(url);
    private buildService(url, name);
    private buildServiceRoutes(name, path, methods, request);
    private parseVerbs(verbs);
}
