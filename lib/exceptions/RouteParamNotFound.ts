export class RouteParamNotFound extends Error {
  constructor(name: string) {
    super("Could not find parameter named '" + name + "'.");
  }
}