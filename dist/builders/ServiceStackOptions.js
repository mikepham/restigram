var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RestServiceOptions_1 = require("../RestServiceOptions");
var RouteAuth_1 = require("../RouteAuth");
var ServiceStackOptions = (function (_super) {
    __extends(ServiceStackOptions, _super);
    function ServiceStackOptions() {
        _super.call(this);
        this.authRouteName = "Auth";
        this.authRouteAuth = RouteAuth_1.RouteAuth.None;
        this.mappings = {};
    }
    return ServiceStackOptions;
})(RestServiceOptions_1.RestServiceOptions);
exports.ServiceStackOptions = ServiceStackOptions;
//# sourceMappingURL=ServiceStackOptions.js.map