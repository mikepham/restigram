/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import {expect} from "chai";
import {RestBuilderOptions} from "../lib/RestBuilderOptions";

describe("RestBuilderOptions", () => {

	it("should create instance", () => {
		let options = new RestBuilderOptions();
		expect(options.api).equal(true);
	});

});