/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import {expect} from "chai";

import {RouteParam} from "../lib/RouteParam";
import {RouteParamInfo} from "../lib/RouteParamInfo";
import {RouteParamKind} from "../lib/RouteParamKind";

describe("RouteParam", () => {

  it("should create instance", () => {
    let info = new RouteParamInfo();
    let param = new RouteParam(info);
    expect(param).instanceof(RouteParam);
  });

  it("should create header parameter", () => {
    let info = new RouteParamInfo();
    info.kind = RouteParamKind.Header;
    info.name = "name";

    let param = new RouteParam(info);
    expect(param.kind).equals(RouteParamKind.Header);  
  });

  it("should create query parameter", () => {
    let info = new RouteParamInfo();
    info.kind = RouteParamKind.Query;
    info.name = "name";

    let param = new RouteParam(info);
    expect(param.kind).equals(RouteParamKind.Query);  
  });

  it("should create request parameter", () => {
    let info = new RouteParamInfo();
    info.kind = RouteParamKind.Request;
    info.name = "name";

    let param = new RouteParam(info);
    expect(param.kind).equals(RouteParamKind.Request);  
  });

  it("should create url parameter", () => {
    let info = new RouteParamInfo();
    info.kind = RouteParamKind.Url;
    info.name = "name";

    let param = new RouteParam(info);
    expect(param.kind).equals(RouteParamKind.Url);  
  });

});