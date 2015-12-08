/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import {expect} from "chai";

import {RestService} from "../lib/RestService";
import {RestServiceBuilder} from "../lib/RestServiceBuilder";
import {RestServiceOptions} from "../lib/RestServiceOptions";

describe("When using the RestService class...", () => {

  let service: RestService;
  let builder: RestServiceBuilder;

  beforeEach(() => {
    builder = new RestServiceBuilder(new RestServiceOptions());
    service = new RestService("localhost", "http://localhost", builder);
  });

  it("should create instance", () => {
    expect(service).instanceof(RestService);
    expect(service.builder).instanceof(RestServiceBuilder);
    expect(service.name).equals("localhost");
    expect(service.url).equals("http://localhost");
  });

});