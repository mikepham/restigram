/// <reference path="../links.d.ts" />
var extend = require("extend");
var superagent = require("superagent");
var ErrorRouteExecute_1 = require("../exceptions/ErrorRouteExecute");
var RouteMethod_1 = require("../RouteMethod");
var DefaultRouteExecutor = (function () {
    function DefaultRouteExecutor(route) {
    }
    Object.defineProperty(DefaultRouteExecutor.prototype, "route", {
        get: function () {
            return this._route;
        },
        enumerable: true,
        configurable: true
    });
    DefaultRouteExecutor.prototype.execute = function (request, values) {
        if (request && this.route.method === RouteMethod_1.RouteMethod.Get) {
            throw new ErrorRouteExecute_1.ErrorRouteExecute(this.route);
        }
        var header_values = values ? this.toObject(values.headers) : null;
        var query_values = values ? this.toObject(values.query) : null;
        var url_values = values ? this.toObject(values.url) : null;
        var request_data = extend(true, {}, request, this.route.createRequest());
        var request_headers = extend(true, {}, header_values, this.route.createHeaders());
        var method = RouteMethod_1.RouteMethod[this.route.method];
        var url = this.route.createUrl(query_values, url_values);
        var http = superagent(method, url);
        if (request_data) {
            http.send(request_data);
        }
        this.setHeaders(http, request_headers);
        return new Promise(function (resolve, reject) {
            return http.end(function (error, response) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response);
                }
            });
        });
    };
    DefaultRouteExecutor.prototype.setHeaders = function (http, headers) {
        for (var header in headers) {
            var value = headers[header];
            if (value) {
                if (header.toLowerCase() === "content-type") {
                    // BUG: Fixes a bug in browsers where the content-type is sent
                    // twice, i.e. "application/json, application/json".
                    http.type(value);
                }
                else {
                    http.set(header, value);
                }
            }
        }
    };
    DefaultRouteExecutor.prototype.toObject = function (kvp) {
        var values = {};
        kvp.forEach(function (key, value) {
            values[key] = value;
        });
        return values;
    };
    return DefaultRouteExecutor;
})();
exports.DefaultRouteExecutor = DefaultRouteExecutor;
//# sourceMappingURL=DefaultRouteExecutor.js.map