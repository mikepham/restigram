/// <reference path="../links.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var superagent = require("superagent");
var RestServiceBuilder_1 = require("../RestServiceBuilder");
var Route_1 = require("../Route");
var RouteAuth_1 = require("../RouteAuth");
var RouteInfo_1 = require("../RouteInfo");
var RouteMethod_1 = require("../RouteMethod");
var BridgeInfo = (function () {
    function BridgeInfo(info) {
        this._id = info.id;
        this._internalipaddress = info.internalipaddress;
    }
    Object.defineProperty(BridgeInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BridgeInfo.prototype, "internalipaddress", {
        get: function () {
            return this._internalipaddress;
        },
        enumerable: true,
        configurable: true
    });
    return BridgeInfo;
})();
var HueBridgeBuilder = (function (_super) {
    __extends(HueBridgeBuilder, _super);
    function HueBridgeBuilder(options) {
        _super.call(this, options);
    }
    HueBridgeBuilder.prototype.build = function (url) {
        var _this = this;
        var api = {
            bridges: []
        };
        return this.retrieveBridgeInfo()
            .then(function (response) {
            var bridges = [];
            response.forEach(function (x) { return bridges.push(new BridgeInfo(x)); });
            bridges.forEach(function (bridge) {
                api.bridges.push(bridge);
                api[bridge.id] = {};
                var address = "http://" + bridge.internalipaddress;
                _this.buildBridgeCalls(address, api[bridge.id]);
            });
            return api;
        })
            .catch(function (error) {
            console.error(error);
            console.trace();
        });
    };
    HueBridgeBuilder.prototype.buildBridgeCalls = function (url, api) {
        this.buildLightRoutes(url, api);
    };
    HueBridgeBuilder.prototype.buildLightRoutes = function (url, api) {
        var group_name = "lights";
        var get_lights = new RouteInfo_1.RouteInfo();
        get_lights.auth = RouteAuth_1.RouteAuth.None;
        get_lights.group = group_name;
        get_lights.id = "get_lights";
        get_lights.method = RouteMethod_1.RouteMethod.Get;
        get_lights.name = "List Lights";
        get_lights.path = "/api/{username}/lights";
        get_lights.url = url.toString();
        this.route(api, new Route_1.Route(get_lights));
        var set_light_state = new RouteInfo_1.RouteInfo();
        set_light_state.auth = RouteAuth_1.RouteAuth.None;
        set_light_state.group = group_name;
        set_light_state.id = "set_light_state";
        set_light_state.method = RouteMethod_1.RouteMethod.Put;
        set_light_state.name = "Set Light State";
        set_light_state.path = "/api/{username}/lights/{lightid}";
        set_light_state.url = url.toString();
        this.route(api, new Route_1.Route(set_light_state));
    };
    HueBridgeBuilder.prototype.retrieveBridgeInfo = function () {
        var request = superagent(HueBridgeBuilder.nupnp);
        return new Promise(function (resolve, reject) {
            return request.end(function (error, response) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response.body);
                }
            });
        });
    };
    HueBridgeBuilder.nupnp = "https://www.meethue.com/api/nupnp";
    return HueBridgeBuilder;
})(RestServiceBuilder_1.RestServiceBuilder);
exports.HueBridgeBuilder = HueBridgeBuilder;
//# sourceMappingURL=HueBridgeBuilder.js.map