/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/mocha/mocha.d.ts" />

import {expect} from "chai";
import {ServiceStackBuilder} from "../../lib/builders/ServiceStackBuilder";
import {ServiceStackOptions} from "../../lib/builders/ServiceStackOptions";

describe("When using the ServiceStackBuilder class...", () => {

  it("should build routes with group mapping", (done) => {

    let options: ServiceStackOptions = new ServiceStackOptions();
    options.mappings["Auth"] = "authentication";
    let builder: ServiceStackBuilder = new ServiceStackBuilder(options);

    builder.build("https://api-qa01-iol.homenetauto.com").then(api => {
      expect(api).not.undefined;
      expect(api.authentication).not.undefined;
      expect(api.authentication.get).instanceof(Function);
      expect(api.authentication.post).instanceof(Function);
      done();
    });

  });

  describe("using default options,", () => {

    let builder: ServiceStackBuilder;
    let options: ServiceStackOptions;

    beforeEach(() => {
      options = new ServiceStackOptions();
      builder = new ServiceStackBuilder(options);
    });

    it("should build routes from metadata and package into groups", (done) => {
      builder.build("https://api-qa01-iol.homenetauto.com").then(api => {
        expect(api).not.undefined;
        expect(api.Auth).not.undefined;
        expect(api.Auth.get).instanceof(Function);
        expect(api.Auth.post).instanceof(Function);
        done();
      });
    });

  });

});