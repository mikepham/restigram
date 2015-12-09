var RestService = (function () {
    function RestService(name, url, builder) {
        this._builder = builder;
        this._name = name;
        this._url = url;
        this.generate();
    }
    Object.defineProperty(RestService.prototype, "builder", {
        get: function () {
            return this._builder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RestService.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RestService.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    RestService.prototype.refresh = function () {
        this.generate();
    };
    RestService.prototype.generate = function () {
        this._api = this._builder.build(this.url);
    };
    return RestService;
})();
exports.RestService = RestService;
//# sourceMappingURL=RestService.js.map