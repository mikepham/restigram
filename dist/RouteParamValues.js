/// <reference path="links.d.ts" />
var RouteParamValues = (function () {
    function RouteParamValues() {
        this._headers = new collections.Dictionary();
        this._query = new collections.Dictionary();
        this._url = new collections.Dictionary();
    }
    Object.defineProperty(RouteParamValues.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouteParamValues.prototype, "query", {
        get: function () {
            return this._query;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouteParamValues.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    return RouteParamValues;
})();
exports.RouteParamValues = RouteParamValues;
//# sourceMappingURL=RouteParamValues.js.map