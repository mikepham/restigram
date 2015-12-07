/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
var chai_1 = require("chai");
var RestBuilder_1 = require("../lib/RestBuilder");
var RestBuilderOptions_1 = require("../lib/RestBuilderOptions");
describe("RestBuilder", function () {
    it("should create instance", function () {
        chai_1.expect(new RestBuilder_1.RestBuilder(new RestBuilderOptions_1.RestBuilderOptions())).not.undefined;
    });
});
//# sourceMappingURL=restbuilder_class.js.map