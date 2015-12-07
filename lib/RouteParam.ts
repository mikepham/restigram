import {RouteParamKind} from "./RouteParamKind";

export class RouteParam {
  private _kind: RouteParamKind;
  private _name: string;
  private _source: string;
  private _type: string;

  /**
   * Initializes a new instance of {RouteParam}.
   * @constructor
   * @param {string} name - name to use for the parameter
   * @param {RouteParamKind} kind - determines how the parameter is used
   * @param {string} source - string to parse to get parameter value at runtime.
   * @param {string} type - string type of the parameter value
   */
  constructor(name: string, kind?: RouteParamKind, source?: string, type?: string) {
    this._kind = kind;
    this._name = name;
    this._source = source;
    this._type = type;
  }

  /**
   * Gets the {RouteParamKind} of the parameter.
   */
  get kind(): RouteParamKind {
    return this._kind;
  }

  /**
   * Gets the name of the parameter.
   */
  get name(): string {
    return this._name;
  }

  /**
   * Gets the source string to be parsed to get the parameter value at runtime.
   */
  get source(): string {
    return this._source;
  }

  /**
   * Gets the type of the parameter value.
   */
  get type(): string {
    return this._type;
  }

  /**
   * Resolves the source string by walking the context object and returning the value.
   */
  public resolve(context: any): any {
    return null;
  }
}