/// <reference path="../artifacts/RestBuilder.d.ts" />
/// <reference path="../artifacts/RestBuilderOptions.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

import rest from "../lib/RestBuilder";
import options from "../lib/RestBuilderOptions";

describe("RestBuilder", () => {

	it("should create instance", () => {
		var builder = new rest(new options());
	});

});