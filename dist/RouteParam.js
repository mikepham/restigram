var RouteParamInfo_1 = require("./RouteParamInfo");
var RouteParam = (function () {
    function RouteParam(info) {
        this._kind = info.kind;
        this._name = info.name;
        this._optional = info.optional;
        this._source = info.source;
        this._type = info.type;
    }
    Object.defineProperty(RouteParam.prototype, "kind", {
        get: function () {
            return this._kind;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouteParam.prototype, "optional", {
        get: function () {
            return this._optional;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouteParam.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouteParam.prototype, "source", {
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouteParam.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    RouteParam.load = function (instance) {
        return new RouteParam(instance);
    };
    RouteParam.save = function (param) {
        var info = new RouteParamInfo_1.RouteParamInfo();
        info.kind = param._kind;
        info.name = param._name;
        info.optional = param._optional;
        info.source = param._source;
        info.type = param._type;
        return info;
    };
    RouteParam.prototype.resolve = function (context) {
        return null;
    };
    return RouteParam;
})();
exports.RouteParam = RouteParam;
//# sourceMappingURL=RouteParam.js.map