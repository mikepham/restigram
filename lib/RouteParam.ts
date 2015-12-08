import {RouteParamKind} from "./RouteParamKind";
import {RouteParamInfo} from "./RouteParamInfo";

export class RouteParam {
  private _kind: RouteParamKind;
  private _name: string;
  private _optional: boolean;
  private _source: string;
  private _type: string;

  public constructor(info: RouteParamInfo) {
    this._kind = info.kind;
    this._name = info.name;
    this._optional = info.optional;
    this._source = info.source;
    this._type = info.type;
  }

  public get kind(): RouteParamKind {
    return this._kind;
  }

  public get optional(): boolean {
    return this._optional;
  }

  public get name(): string {
    return this._name;
  }

  public get source(): string {
    return this._source;
  }

  public get type(): string {
    return this._type;
  }

  public static load(instance: RouteParamInfo): RouteParam {
    return new RouteParam(instance);
  }

  public static save(param: RouteParam): RouteParamInfo {
    let info = new RouteParamInfo();
    info.kind = param._kind;
    info.name = param._name;
    info.optional = param._optional;
    info.source = param._source;
    info.type = param._type;
    return info;
  }

  public resolve(context: Object): Object {
    return null;
  }
}