/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
var chai_1 = require("chai");
var RestBuilderOptions_1 = require("../lib/RestBuilderOptions");
describe("RestBuilderOptions", function () {
    it("should create instance", function () {
        var options = new RestBuilderOptions_1.RestBuilderOptions();
        chai_1.expect(options.api).equal(true);
    });
});
//# sourceMappingURL=restbuilderoptions_class.js.map