/// <reference path="../typings/tsd.d.ts" />
var RouteInfo_1 = require("./RouteInfo");
var RouteParamKind_1 = require("./RouteParamKind");
var ErrorRouteParamNotFound_1 = require("./exceptions/ErrorRouteParamNotFound");
var Utils_1 = require("./Utils");
var Route = (function () {
    function Route(info, params) {
        this._auth = info.auth;
        this._group = info.group;
        this._id = info.id;
        this._method = info.method;
        this._name = info.name;
        this._params = params;
        this._path = info.path;
        this._url = info.url;
    }
    Object.defineProperty(Route.prototype, "auth", {
        get: function () {
            return this._auth;
        },
        set: function (auth) {
            this._auth = auth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "group", {
        get: function () {
            return this._group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "method", {
        get: function () {
            return this._method;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "name", {
        get: function () {
            return this._name || this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "params", {
        get: function () {
            var names = [];
            this._params.forEach(function (x) { return names.push(x.name); });
            return names;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Route.load = function (instance) {
        return new Route(instance);
    };
    Route.save = function (route) {
        var info = new RouteInfo_1.RouteInfo();
        info.auth = route._auth;
        info.group = route._group;
        info.id = route._id;
        info.method = route._method;
        info.name = route._name;
        info.path = route._path;
        info.url = route._url;
        return info;
    };
    Route.prototype.createHeaders = function (context) {
        var headers = {};
        this.getHeaderParameters().forEach(function (header) {
            headers[header.name] = header.resolve(context);
        });
        return headers;
    };
    Route.prototype.createRequest = function (context, includeOptionals) {
        var request = {};
        this.getRequestParameters().forEach(function (param) {
            var included = param.optional && !includeOptionals ? false : true;
            if (included) {
                request[param.name] = param.resolve(context);
            }
        });
        return request;
    };
    Route.prototype.createUrl = function (query, url) {
        var variables = Utils_1.Utils.variables(this.url);
        return this._url;
    };
    Route.prototype.getHeaderParameters = function () {
        var params = [];
        this._params.forEach(function (param) {
            if (param.kind === RouteParamKind_1.RouteParamKind.Header) {
                params.push(param);
            }
        });
        return params;
    };
    Route.prototype.getQueryParameters = function () {
        var params = [];
        this._params.forEach(function (param) {
            if (param.kind === RouteParamKind_1.RouteParamKind.Query) {
                params.push(param);
            }
        });
        return params;
    };
    Route.prototype.getRequestParameters = function () {
        var params = [];
        this._params.forEach(function (param) {
            if (param.kind === RouteParamKind_1.RouteParamKind.Request) {
                params.push(param);
            }
        });
        return params;
    };
    Route.prototype.getUrlParameters = function () {
        var params = [];
        this._params.forEach(function (param) {
            if (param.kind === RouteParamKind_1.RouteParamKind.Url) {
                params.push(param);
            }
        });
        return params;
    };
    Route.prototype.param = function (name) {
        for (var index = 0; index < this._params.length; index++) {
            var param = this._params[index];
            if (param.name === name) {
                return param;
            }
        }
        throw new ErrorRouteParamNotFound_1.ErrorRouteParamNotFound(name);
    };
    return Route;
})();
exports.Route = Route;
//# sourceMappingURL=Route.js.map