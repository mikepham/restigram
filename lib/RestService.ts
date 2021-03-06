/// <reference path="links.d.ts" />

import {} from "bluebird";

import {RestServiceBuilder} from "./RestServiceBuilder";
import {RestServiceOptions} from "./RestServiceOptions";

export class RestService {
  private _api: Object;
  private _builder: RestServiceBuilder;
  private _name: string;
  private _url: string;

  public constructor(name: string, url: string, builder: RestServiceBuilder) {
    this._builder = builder;
    this._name = name;
    this._url = url;
  }

  public get api(): any {
    return this._api;
  }

  public get builder(): RestServiceBuilder {
    return this._builder;
  }

  public get name(): string {
    return this._name;
  }

  public get url(): string {
    return this._url;
  }

  public refresh(): Promise<any> {
    return this.generate();
  }

  protected generate(): Promise<any> {
    return this._builder.build(this.url).then(api => {
      return this._api = api;
    });
  }
}