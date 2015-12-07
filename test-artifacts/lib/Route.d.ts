import { RouteMethod } from "./RouteMethod";
import { RouteParam } from "./RouteParam";
export declare class Route {
    private _group;
    private _id;
    private _method;
    private _name;
    private _params;
    private _path;
    private _url;
    /**
     * Initializes a new instance of {Route}.
     * @constructor
     * @param {string} id - unique identifier for the route
     * @param {string} method - HTTP method to use when calling the route
     * @param {string} path - path to the specified route resource
     * @param {string} url - url to the route.
     * @param {RouteParam[]} params - parameters for the route including headers, request, query, and variable
     * @param {string} group - group to use when generating the API
     * @param {string} name - name of the route
     */
    constructor(id: string, method: RouteMethod, path: string, url: string, params: RouteParam[], group?: string, name?: string);
    /**
     * Gets the group to assign the route to when generating API methods.
     */
    group: string;
    /**
     * Gets the unique identifier for the route.
     */
    id: string;
    /**
     * Gets the method used for the route.
     */
    method: RouteMethod;
    /**
     * Gets the name of the route.
     */
    name: string;
    /**
     * Gets the names of the parameters.
     */
    params: string[];
    /**
     * Gets the path for the route.
     */
    path: string;
    /**
     * Gets the url for the route.
     */
    url: string;
    /**
     * Returns a URL that has been parsed and replaced with values.
     */
    buildUrl(): string;
    /**
     * Gets the collection of header parameters.
     */
    headers(): RouteParam[];
    /**
     * Gets the specified named parameter.
     */
    param(name: string): RouteParam;
    /**
     * Gets the collection of query parameters.
     */
    query(): RouteParam[];
    /**
     * Gets the collection of request parameters.
     */
    request(): RouteParam[];
    /**
     * Gets the collection of variable parameters.
     */
    variables(): RouteParam[];
}
