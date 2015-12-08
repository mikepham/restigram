import {RestServiceBuilder} from "./RestServiceBuilder";
import {RestServiceOptions} from "./RestServiceOptions";

export class RestService {
  private _api: Object;
  private _builder: RestServiceBuilder;
  private _name: string;
  private _url: string;

  constructor(name: string, url: string, builder: RestServiceBuilder) {
    this._builder = builder;
    this._name = name;
    this._url = url;

    this.refresh();
  }

  get builder(): RestServiceBuilder {
    return this._builder;
  }

  get name(): string {
    return this._name;
  }

  get url(): string {
    return this._url;
  }

  public refresh(): void {
    this.generate();
  }

  protected generate(): void {
    this._api = this._builder.build();
  }
}