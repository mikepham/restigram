import {RestBuilderOptions} from "./RestBuilderOptions";

export class RestBuilder {
  private options: RestBuilderOptions;

	/**
	 * Initializes a new instance of {RestBuilder}.
	 * @param {RestBuilderOptions} set of options to use when generating the API
	 */
  constructor(options: RestBuilderOptions) {
    this.options = options;
  }
}