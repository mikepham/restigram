/// <reference path="../typings/tsd.d.ts" />
var ErrorRouteExists_1 = require("./exceptions/ErrorRouteExists");
var DefaultRouteExecutor_1 = require("./executors/DefaultRouteExecutor");
var RouteMethod_1 = require("./RouteMethod");
var Utils_1 = require("./Utils");
var RestServiceBuilder = (function () {
    function RestServiceBuilder(options) {
        this._api = {};
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
    Object.defineProperty(RestServiceBuilder.prototype, "api", {
        get: function () {
            return this._api;
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
        this._routes.push({ route: route, executor: this.route(this._api, route) });
        return this;
    };
    RestServiceBuilder.prototype.build = function (url) {
        var _this = this;
        this._api = {};
        if (url) {
            this._routes.forEach(function (route) {
                if (route.route.url !== url) {
                    route.route.url = url;
                }
                _this.route(_this._api, route.route);
            });
        }
        return Promise.resolve(this._api);
    };
    RestServiceBuilder.prototype.exists = function (id) {
        for (var index = 0; index < this._routes.length; index++) {
            var route = this._routes[index];
            if (route.route.id === id) {
                return true;
            }
        }
    };
    RestServiceBuilder.prototype.group = function (name) {
        var routes = [];
        this._routes.forEach(function (route) {
            if (route.route.group === name) {
                routes.push(route.route);
            }
        });
        return routes;
    };
    RestServiceBuilder.prototype.route = function (api, route) {
        var executor = new DefaultRouteExecutor_1.DefaultRouteExecutor(route);
        var group = route.group || route.id;
        var method = RouteMethod_1.RouteMethod[route.method];
        if (!api[group]) {
            api[group] = {};
        }
        api[group][method ? method.toLowerCase() : method] = executor.execute;
        return executor;
    };
    return RestServiceBuilder;
})();
exports.RestServiceBuilder = RestServiceBuilder;
//# sourceMappingURL=RestServiceBuilder.js.map