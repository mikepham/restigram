/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import {expect} from "chai";

import {Utils} from "../lib/Utils";

describe("When using the Utils module...", () => {

  describe("and calling string function", () => {

    let expected = "The quick brown fox jumped over the fence.";
    let expectedCallback = "The none none none jumped over the none.";
    let expectedEmpty = "The    jumped over the .";
    let expectedMultiple = "The quick brown fox jumped over the fox.";

    describe("capitalize,", () => {

      const all_lower: string = "first";
      const mixed_case: string = "fiRST";
      const sentence: string = "this is the story of mice and men.";
      const expected: string = "First";
      const expected_sentence: string = "This is the story of mice and men."
      const expected_sentence_all: string = "This Is The Story Of Mice And Men.";

      it("should capitalize lowercase string", () => {
        let actual: string = Utils.capitalize(all_lower);
        expect(actual).equals(expected);
      });

      it("should capitalize mixed-case string", () => {
        let actual: string = Utils.capitalize(mixed_case);
        expect(actual).equals(expected);
      });

      it("should capitalize first word of sentence", () => {
        let actual: string = Utils.capitalize(sentence);
        expect(actual).equals(expected_sentence);
      });

      it("should capitalize every word of sentence", () => {
        let actual: string = Utils.capitalize(sentence, true);
        expect(actual).equals(expected_sentence_all);
      });

    });

    describe("expand,", () => {

      let multiple: string = "The {action} {color} {animal} jumped over the {animal}.";
      let single: string = "The {action} {color} {animal} jumped over the {obstacle}.";

      let values = {
        action: "quick",
        animal: "fox",
        color: "brown",
        obstacle: "fence"
      };

      it("should return expanded string", () => {
        let actual = Utils.expand(single, values);
        expect(actual).equals(expected);
      });

      it("should return expanded string with multiple keys", () => {
        let actual = Utils.expand(multiple, values);
        expect(actual).equals(expectedMultiple)
      });

      it("should return expanded string with empty values when keys not found", () => {
        let actual = Utils.expand(single, {});
        expect(actual).equals(expectedEmpty);
      });

      it("should return expanded string using callback", () => {
        let actual = Utils.expand(single, key => "none");
        expect(actual).equals(expectedCallback);
      });

    });

    describe("format,", () => {

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

      it("should format string using callback", () => {
        let actual = Utils.format(single, (key) => "none");
        expect(actual).equals(expectedCallback);
      });

    });

  });

  describe("contains,", () => {

    let testable: string[] = ["apples", "bananas", "mangos", "oranges"];

    it("should return false when value in array", () => {
      expect(Utils.contains(testable, "tomato")).false;
    });

    it("should return true when value in array", () => {
      expect(Utils.contains(testable, "mangos")).true;
    });

    it("should return false when custom callback used", () => {
      expect(Utils.contains(testable, (value, index) => false)).false;
    });

    it("should return true when custom callback used", () => {
      expect(Utils.contains(testable, (value, index) => true)).true;
    });

  });

  describe("select", () => {

    let collection: Object = { first: { name: "first" }, second: { name: "second" }, third: { name: "third" }, fourth: { name: "fourth" }, fifth: { name: "fifth" } };
    let collection_array: Object[] = [{ key: "first" }, { key: "second" }, { key: "third" }, { key: "fourth" }, { key: "fifth" }];
    let collection_object: Object = { first: "first", second: "second", third: "third", fourth: "fourth", fifth: "fifth" };
    let expected = ["first", "second", "third", "fourth", "fifth"];

    it("should select string values from array", () => {
      let actual: string[] = Utils.select<string>(collection_array, item => item["key"]);
      expect(actual).deep.equal(expected);
    });

    it("should select string values from object", () => {
      let actual: string[] = Utils.select<string>(collection_object, (item, key, collection) => collection[key]);
      expect(actual).deep.equal(expected);
    });

    it("should select object path", () => {
      let actual: string[] = Utils.select<string>(collection, (item, key) => item.name);
      expect(actual).deep.equal(expected);
    });

  });

  describe("variables,", () => {

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