import {RouteParamKind} from "./RouteParamKind";

export class RouteParam {
  private _kind: RouteParamKind;
  private _name: string;
  private _optional: boolean;
  private _source: string;
  private _type: string;

  constructor(name: string, kind?: RouteParamKind, optional?: boolean, source?: string, type?: string) {
    this._kind = kind;
    this._optional = optional;
    this._name = name;
    this._source = source;
    this._type = type;
  }

  get kind(): RouteParamKind {
    return this._kind;
  }

  get optional(): boolean {
    return this._optional;
  }

  get name(): string {
    return this._name;
  }

  get source(): string {
    return this._source;
  }

  get type(): string {
    return this._type;
  }

  public resolve(context: Object): Object {
    return null;
  }
}