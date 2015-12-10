/// <reference path="../lib/links.d.ts" />
import { RestServiceBuilder } from "./RestServiceBuilder";
export declare class RestService {
    private _api;
    private _builder;
    private _name;
    private _url;
    constructor(name: string, url: string, builder: RestServiceBuilder);
    builder: RestServiceBuilder;
    name: string;
    url: string;
    refresh(): void;
    protected generate(): Promise<any>;
}
