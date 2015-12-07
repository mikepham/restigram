var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RouteParamNotFound = (function (_super) {
    __extends(RouteParamNotFound, _super);
    /**
     * Initializes a new instance of {RouteParamNotFound}.
     * @param {string} name - name of the route parameter
     */
    function RouteParamNotFound(name) {
        _super.call(this, "Could not find parameter named '" + name + "'.");
    }
    return RouteParamNotFound;
})(Error);
exports.RouteParamNotFound = RouteParamNotFound;
//# sourceMappingURL=RouteParamNotFound.js.map