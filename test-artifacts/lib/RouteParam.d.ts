import { RouteParamKind } from "./RouteParamKind";
export declare class RouteParam {
    private _kind;
    private _name;
    private _optional;
    private _source;
    private _type;
    /**
     * Initializes a new instance of {RouteParam}.
     * @constructor
     * @param {string} name - name to use for the parameter
     * @param {RouteParamKind} kind - determines how the parameter is used
     * @param {boolean} optional - determines whether the parameter is optional
     * @param {string} source - string to parse to get parameter value at runtime
     * @param {string} type - string type of the parameter value
     */
    constructor(name: string, kind?: RouteParamKind, optional?: boolean, source?: string, type?: string);
    /**
     * Gets the {RouteParamKind} of the parameter.
     */
    kind: RouteParamKind;
    /**
     * Gets a value indicating whether the parameter is optional.
     */
    optional: boolean;
    /**
     * Gets the name of the parameter.
     */
    name: string;
    /**
     * Gets the source string to be parsed to get the parameter value at runtime.
     */
    source: string;
    /**
     * Gets the type of the parameter value.
     */
    type: string;
    /**
     * Resolves the source string by walking the context object and returning the value.
     */
    resolve(context: any): any;
}
