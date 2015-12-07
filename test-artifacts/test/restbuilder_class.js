/// <reference path="../artifacts/RestBuilder.d.ts" />
/// <reference path="../artifacts/RestBuilderOptions.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
var RestBuilder_1 = require("../lib/RestBuilder");
var RestBuilderOptions_1 = require("../lib/RestBuilderOptions");
describe("RestBuilder", function () {
    it("should create instance", function () {
        var builder = new RestBuilder_1.default(new RestBuilderOptions_1.default());
    });
});
//# sourceMappingURL=restbuilder_class.js.map