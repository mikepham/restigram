import { RouteParamKind } from "./RouteParamKind";
import { RouteParamInfo } from "./RouteParamInfo";
export declare class RouteParam {
    private _kind;
    private _name;
    private _optional;
    private _source;
    private _type;
    constructor(info: RouteParamInfo);
    kind: RouteParamKind;
    optional: boolean;
    name: string;
    source: string;
    type: string;
    static load(instance: RouteParamInfo): RouteParam;
    static save(param: RouteParam): RouteParamInfo;
    resolve(context: Object): Object;
}
