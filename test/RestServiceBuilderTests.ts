/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import {expect} from "chai";
import {RestServiceBuilder} from "../lib/RestServiceBuilder";
import {RestServiceOptions} from "../lib/RestServiceOptions";
import {Route} from "../lib/Route";
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
    let route = new Route("test", "/");
    builder.add(route);
    expect(builder.count).equals(1);
    expect(builder.exists("test")).true;
  });

});