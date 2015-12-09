var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RestServiceBuilder_1 = require("../../lib/RestServiceBuilder");
var ServiceStackBuilder = (function (_super) {
    __extends(ServiceStackBuilder, _super);
    function ServiceStackBuilder(options) {
        _super.call(this, options);
    }
    return ServiceStackBuilder;
})(RestServiceBuilder_1.RestServiceBuilder);
exports.ServiceStackBuilder = ServiceStackBuilder;
//# sourceMappingURL=ServiceStackBuilder.js.map