/// <reference path="../../typings/tsd.d.ts" />
import { RestServiceBuilder } from "../RestServiceBuilder";
import { RestServiceOptions } from "../RestServiceOptions";
export declare class HueBridgeBuilder extends RestServiceBuilder {
    private static nupnp;
    constructor(options: RestServiceOptions);
    build(url: string): Promise<any>;
    private buildBridgeCalls(url, api);
    private buildLightRoutes(url, api);
    private getBridgeInfo();
}
