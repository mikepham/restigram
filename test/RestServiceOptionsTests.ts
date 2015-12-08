/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import {expect} from "chai";
import {RestServiceOptions} from "../lib/RestServiceOptions";

describe("RestServiceOptions", () => {

  let options: RestServiceOptions;

  beforeEach(() => {
    options = new RestServiceOptions();
  });

  it("should create instance", () => {
    expect(options).instanceof(RestServiceOptions);
  });

});