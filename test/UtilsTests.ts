/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import {expect} from "chai";

import {Utils} from "../lib/Utils";

describe("When using the Utils module...", () => {

  describe("..and calling string functions...", () => {

    let expected = "The quick brown fox jumped over the fence.";
    let expectedEmpty = "The    jumped over the .";
    let expectedMultiple = "The quick brown fox jumped over the fox.";

    describe("expand", () => {

      let multiple: string = "The {action} {color} {animal} jumped over the {animal}.";
      let single: string = "The {action} {color} {animal} jumped over the {obstacle}.";

      let values = {
        action: "quick",
        animal: "fox",
        color: "brown",
        obstacle: "fence"
      };

      it("should expand string", () => {
        let actual = Utils.expand(single, values);
        expect(actual).equals(expected);
      });

      it("should expand string with multiple keys", () => {
        let actual = Utils.expand(multiple, values);
        expect(actual).equals(expectedMultiple)
      });

      it("should expand string with empty values when keys not found", () => {
        let actual = Utils.expand(single, {});
        expect(actual).equals(expectedEmpty);
      });

    });

    describe("format", () => {

      let multiple: string = "The {0} {1} {2} jumped over the {2}.";
      let single: string = "The {0} {1} {2} jumped over the {3}.";
      let values: string[] = ["quick", "brown", "fox", "fence"];

      it("should format string", () => {
        let actual = Utils.format(single, values);
        expect(actual).equals(expected);
      });

      it("should format string with multiple indices", () => {
        let actual = Utils.format(multiple, values);
        expect(actual).equals(expectedMultiple);
      });

      it("should format string with empty values when indices not found", () => {
        let actual = Utils.format(single, []);
        expect(actual).equals(expectedEmpty);
      });

    });

  });

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