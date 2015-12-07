import { RestBuilderOptions } from "./RestBuilderOptions";
import { Route } from "./Route";
export declare class RestBuilder {
    private _options;
    private _routes;
    /**
     * Initializes a new instance of {RestBuilder}.
   * @constructor
     * @param {RestBuilderOptions} options - set of options to use when generating the API
     */
    constructor(options: RestBuilderOptions);
    /**
     * Gets the builder options.
     */
    options: RestBuilderOptions;
    /**
     * Adds the route to the collection.
     */
    add(route: Route): void;
    private build(route);
}
export interface IRouteExecutor {
    route: Route;
}
