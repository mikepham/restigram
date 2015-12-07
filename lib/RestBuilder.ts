import {RestBuilderOptions} from "./RestBuilderOptions";
import {Route} from "./Route";

export class RestBuilder {
  private _options: RestBuilderOptions;
  private _routes: Route[];

	/**
	 * Initializes a new instance of {RestBuilder}.
   * @constructor
	 * @param {RestBuilderOptions} options - set of options to use when generating the API
	 */
  constructor(options: RestBuilderOptions) {
    this._options = options;
  }

  /**
   * Gets the builder options.
   */
  get options(): RestBuilderOptions {
    return this._options;
  }

  /**
   * Adds the route to the collection.
   */
  public add(route : Route): void {
    this._routes.push(route);
    this.build(route);
  }

  private build(route: Route): void {
  }
}

export interface IRouteExecutor {
  route: Route;
}