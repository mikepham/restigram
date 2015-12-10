var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils_1 = require("../Utils");
var ErrorRouteParamNotFound = (function (_super) {
    __extends(ErrorRouteParamNotFound, _super);
    function ErrorRouteParamNotFound(name) {
        _super.call(this, Utils_1.Utils.format("Could not find parameter named '{0}'.", [name]));
    }
    return ErrorRouteParamNotFound;
})(Error);
exports.ErrorRouteParamNotFound = ErrorRouteParamNotFound;
//# sourceMappingURL=ErrorRouteParamNotFound.js.map