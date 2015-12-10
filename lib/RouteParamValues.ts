/// <reference path="links.d.ts" />

export class RouteParamValues {
  private _headers: collections.Dictionary<string, string> = new collections.Dictionary<string, string>();
  private _query: collections.Dictionary<string, string> = new collections.Dictionary<string, string>();
  private _url: collections.Dictionary<string, string> = new collections.Dictionary<string, string>();

  public get headers(): collections.Dictionary<string, string> {
    return this._headers;
  }

  public get query(): collections.Dictionary<string, any> {
    return this._query;
  }

  public get url(): collections.Dictionary<string, any> {
    return this._url;
  }
}