/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import {expect} from "chai";
import {RestServiceBuilder} from "../lib/RestServiceBuilder";
import {RestServiceOptions} from "../lib/RestServiceOptions";
import {Route} from "../lib/Route";
import {RouteInfo} from "../lib/RouteInfo";
import {RouteMethod} from "../lib/RouteMethod";

describe("RestServiceBuilder", () => {

  let builder;

  beforeEach(() => {
    builder = new RestServiceBuilder(new RestServiceOptions());
  });

  it("should create instance", () => {
    expect(builder).instanceof(RestServiceBuilder);
    expect(builder.options).instanceof(RestServiceOptions);
  });

  it("should add route", () => {
    let info = new RouteInfo();
    info.id = "test";
    info.path = "/";

    let route = new Route(info);

    builder.add(route);
    expect(builder.count).equals(1);
    expect(builder.exists("test")).true;
  });

});