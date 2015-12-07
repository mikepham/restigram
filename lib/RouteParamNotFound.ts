export class RouteParamNotFound extends Error {
  /**
   * Initializes a new instance of {RouteParamNotFound}.
   * @param {string} name - name of the route parameter
   */
  constructor(name: string) {
    super("Could not find parameter named '" + name + "'.");
  }
}