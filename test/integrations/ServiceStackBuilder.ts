/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/mocha/mocha.d.ts" />

import {expect} from "chai";
import {ServiceStackBuilder} from "../../lib/builders/ServiceStackBuilder";
import {ServiceStackOptions} from "../../lib/builders/ServiceStackOptions";

describe("When using the ServiceStackBuilder class...", () => {
  let builder: ServiceStackBuilder;
  let options: ServiceStackOptions;

  beforeEach(() => {
    options = new ServiceStackOptions();
    builder = new ServiceStackBuilder(options);
  });

  it("should build routes from metadata", (done) => {
    builder.build("https://api-qa01-iol.homenetauto.com").then(api => {
      expect(api).not.undefined;
      expect(api.Auth).not.undefined;
      expect(api.Auth.post).not.undefined;
      expect(api.Auth.post).instanceof(Function);
      done();
    });
  });
});