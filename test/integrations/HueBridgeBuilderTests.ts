/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/mocha/mocha.d.ts" />

import {expect} from "chai";
import {HueBridgeBuilder} from "../../lib/builders/HueBridgeBuilder";
import {RestServiceOptions} from "../../lib/RestServiceOptions";

describe("When using the HueBridgeBuilder class...", () => {

  let options = new RestServiceOptions();
  let builder = new HueBridgeBuilder(options);

  it("should generate routes for lights api", (done) => {
    builder.build(null)
      .then(api => {
        expect(api).not.undefined;
        expect(api.bridges.length).gt(0);
        api.bridges.forEach(bridge => {
          let lights = api[bridge.id].lights;
          expect(lights).not.undefined;
          expect(lights.get, "get method should be defined").not.undefined;
          expect(lights.put, "put method should be defined").not.undefined;
        });
        done();
      })
      .catch(error => {
        done(error);
      });
  });
});