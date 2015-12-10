var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RouteMethod_1 = require("../RouteMethod");
var Utils_1 = require("../Utils");
var ErrorRouteExecute = (function (_super) {
    __extends(ErrorRouteExecute, _super);
    function ErrorRouteExecute(route) {
        _super.call(this, Utils_1.Utils.format("Route '{0}' using method '{1}' does not accept a request object.", [route.id, RouteMethod_1.RouteMethod[route.method]]));
    }
    return ErrorRouteExecute;
})(Error);
exports.ErrorRouteExecute = ErrorRouteExecute;
//# sourceMappingURL=ErrorRouteExecute.js.map