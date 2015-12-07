/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import {expect} from "chai";
import {RestBuilder} from "../lib/RestBuilder";
import {RestBuilderOptions} from "../lib/RestBuilderOptions";

describe("RestBuilder", () => {

  it("should create instance", () => {
    expect(new RestBuilder(new RestBuilderOptions())).not.undefined;
  });

});