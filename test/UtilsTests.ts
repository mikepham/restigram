/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import {expect} from "chai";

import {Utils} from "../lib/Utils";

describe("Utils", () => {

  describe("contains", () => {

    let testable: string[] = ["apples", "bananas", "mangos", "oranges"];

    it("should return false when value in array", () => {
      expect(Utils.contains(testable, "tomato")).false;
    });

    it("should return true when value in array", () => {
      expect(Utils.contains(testable, "mangos")).true;
    });

  });

  describe("variables", () => {

    let format: { start: string, end: string } = { start: "{:", end: "}" };
    let customVariableString: string = "/testables/{:testable}/{:index}";
    let multipleVariableString: string = "/testables/{testable}/{index}/testables/{index}";
    let standardVariableString: string = "/testables/{testable}/{index}";

    it("should parse custom variable string", () => {
      let names: string[] = Utils.variables(customVariableString, format);
      expect(names.length).equals(2);
      expect(names[0]).equals("testable");
      expect(names[1]).equals("index");
    });

    it("should parse multiple variable string", () => {
      let names: string[] = Utils.variables(multipleVariableString);
      expect(names.length).equals(2);
      expect(names[0]).equals("testable");
      expect(names[1]).equals("index");
    });

    it("should parse standard variable string", () => {
      let names: string[] = Utils.variables(standardVariableString);
      expect(names.length).equals(2);
      expect(names[0]).equals("testable");
      expect(names[1]).equals("index");
    });

  });

});