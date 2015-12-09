var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils_1 = require("../Utils");
var ErrorRouteExists = (function (_super) {
    __extends(ErrorRouteExists, _super);
    function ErrorRouteExists(route) {
        _super.call(this, Utils_1.Utils.format("Route {0} already exists.", [route.id]));
    }
    return ErrorRouteExists;
})(Error);
exports.ErrorRouteExists = ErrorRouteExists;
//# sourceMappingURL=ErrorRouteExists.js.map