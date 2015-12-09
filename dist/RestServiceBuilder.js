var ErrorRouteExists_1 = require("./exceptions/ErrorRouteExists");
var DefaultRouteExecutor_1 = require("./executors/DefaultRouteExecutor");
var Utils_1 = require("./Utils");
var RestServiceBuilder = (function () {
    function RestServiceBuilder(options) {
        this._routes = [];
        this._options = options;
    }
    Object.defineProperty(RestServiceBuilder.prototype, "count", {
        get: function () {
            return this._routes.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RestServiceBuilder.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    RestServiceBuilder.prototype.add = function (route) {
        Utils_1.Utils.contains(this._routes, null, function (index, value, array) {
            if (value.id === route.id) {
                throw new ErrorRouteExists_1.ErrorRouteExists(route);
            }
            return false;
        });
        this._routes.push(route);
        return this;
    };
    RestServiceBuilder.prototype.build = function (url) {
        var _this = this;
        var api = {};
        this._routes.forEach(function (route) {
            if (route.url !== url) {
                route.url = url;
            }
            api[route.group || route.name][route.method] = _this.route(route).execute;
        });
        return api;
    };
    RestServiceBuilder.prototype.exists = function (id) {
        for (var index = 0; index < this._routes.length; index++) {
            var route = this._routes[index];
            if (route.id === id) {
                return true;
            }
        }
    };
    RestServiceBuilder.prototype.route = function (route) {
        return new DefaultRouteExecutor_1.DefaultRouteExecutor(route);
    };
    return RestServiceBuilder;
})();
exports.RestServiceBuilder = RestServiceBuilder;
//# sourceMappingURL=RestServiceBuilder.js.map