/// <reference path="../links.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cheerio = require("cheerio");
var superagent = require("superagent");
var urijs = require("urijs");
var RestServiceBuilder_1 = require("../RestServiceBuilder");
var Route_1 = require("../Route");
var RouteInfo_1 = require("../RouteInfo");
var RouteMethod_1 = require("../RouteMethod");
var RouteParam_1 = require("../RouteParam");
var RouteParamInfo_1 = require("../RouteParamInfo");
var RouteParamKind_1 = require("../RouteParamKind");
var Utils_1 = require("../Utils");
var ServiceStackBuilder = (function (_super) {
    __extends(ServiceStackBuilder, _super);
    function ServiceStackBuilder(options) {
        _super.call(this, options);
    }
    ServiceStackBuilder.prototype.build = function (url) {
        var _this = this;
        return this.buildMetadata(url).then(function () { return _this.api; });
    };
    ServiceStackBuilder.prototype.buildMetadata = function (url) {
        var _this = this;
        var url_metadata = urijs(url).path("metadata").toString();
        var request = superagent("get", url_metadata).set("content-type", "text/html");
        return new Promise(function (resolve, reject) {
            return request.end(function (error, response) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response);
                }
            });
        }).then(function (response) {
            // Load the response HTML.
            return cheerio.load(response.text);
        }).then(function ($) {
            // Parse HTML for operations.
            var operations = $("div.operations table tbody tr");
            var promises = [];
            for (var index = 0; index < operations.length; index++) {
                var operation = operations[index];
                var name_1 = $("th", operation).text();
                var path = $("td a[href^=json]", operation).attr("href");
                // NOTE: We have to do it this way, otherwise the query operators
                // will get escaped.
                var url_service = urijs(url)
                    .pathname(urijs(path).path())
                    .query(urijs(path).query())
                    .toString();
                promises.push(_this.buildService(url_service, name_1));
            }
            return Promise.all(promises).then(function () { return _this.api; });
        }).catch(function (error) {
            console.log(error);
            console.trace();
        });
    };
    ServiceStackBuilder.prototype.buildService = function (url, name) {
        var _this = this;
        var request = superagent("get", url).set("content-type", "text/html");
        return new Promise(function (resolve, reject) {
            return request.end(function (error, response) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response);
                }
            });
        }).then(function (response) {
            // Load the response HTML.
            return cheerio.load(response.text);
        }).then(function ($) {
            // Parse HTML for verbs and request object.
            var form = $("form");
            var info = $("table tbody tr", form);
            var request_example = $("div.example div.request pre").text().match(/{.*}/gm)[0];
            var json = JSON.parse(request_example);
            for (var index = 0; index < info.length; index++) {
                var $info = info[index];
                var $headers = $("th", $info);
                var path = $($headers[1]).text();
                var methods = _this.parseVerbs($($headers[0]).text());
                _this.buildServiceRoutes(name, path, methods, json);
            }
        }).catch(function (error) {
            console.log(error);
            console.trace();
        });
    };
    ServiceStackBuilder.prototype.buildServiceRoutes = function (name, path, methods, request) {
        var _this = this;
        var options = this.options;
        methods.forEach(function (method) {
            var route_info = new RouteInfo_1.RouteInfo();
            route_info.group = options.mappings[name] || name;
            route_info.id = name + RouteMethod_1.RouteMethod[method];
            route_info.method = method;
            route_info.name = name;
            route_info.path = path;
            var params = [];
            Utils_1.Utils.variables(path).forEach(function (variable) {
                var param_info = new RouteParamInfo_1.RouteParamInfo();
                param_info.kind = RouteParamKind_1.RouteParamKind.Url;
                param_info.name = variable;
                param_info.type = "string";
                params.push(new RouteParam_1.RouteParam(param_info));
            });
            Object.keys(request).forEach(function (key) {
                var param_info = new RouteParamInfo_1.RouteParamInfo();
                param_info.kind = RouteParamKind_1.RouteParamKind.Request;
                param_info.name = key;
                param_info.type = "any";
                params.push(new RouteParam_1.RouteParam(param_info));
            });
            _this.add(new Route_1.Route(route_info, params));
        });
    };
    ServiceStackBuilder.prototype.parseVerbs = function (verbs) {
        var methods = [];
        if (verbs.toLowerCase() === "all verbs") {
            Object.keys(RouteMethod_1.RouteMethod)
                .filter(function (key) { return isNaN(parseInt(key, 10)); })
                .forEach(function (key) {
                var value = RouteMethod_1.RouteMethod[key];
                if (!Utils_1.Utils.contains(methods, value)) {
                    methods.push(RouteMethod_1.RouteMethod[key]);
                }
            });
        }
        else {
            Utils_1.Utils.split(verbs).forEach(function (verb) {
                methods.push(RouteMethod_1.RouteMethod[Utils_1.Utils.capitalize(verb)]);
            });
        }
        return methods;
    };
    return ServiceStackBuilder;
})(RestServiceBuilder_1.RestServiceBuilder);
exports.ServiceStackBuilder = ServiceStackBuilder;
//# sourceMappingURL=ServiceStackBuilder.js.map