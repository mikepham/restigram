var RouteParam = (function () {
    /**
     * Initializes a new instance of {RouteParam}.
     * @constructor
     * @param {string} name - name to use for the parameter
     * @param {RouteParamKind} kind - determines how the parameter is used
     * @param {boolean} optional - determines whether the parameter is optional
     * @param {string} source - string to parse to get parameter value at runtime
     * @param {string} type - string type of the parameter value
     */
    function RouteParam(name, kind, optional, source, type) {
        this._kind = kind;
        this._optional = optional;
        this._name = name;
        this._source = source;
        this._type = type;
    }
    Object.defineProperty(RouteParam.prototype, "kind", {
        /**
         * Gets the {RouteParamKind} of the parameter.
         */
        get: function () {
            return this._kind;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouteParam.prototype, "optional", {
        /**
         * Gets a value indicating whether the parameter is optional.
         */
        get: function () {
            return this._optional;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouteParam.prototype, "name", {
        /**
         * Gets the name of the parameter.
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouteParam.prototype, "source", {
        /**
         * Gets the source string to be parsed to get the parameter value at runtime.
         */
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouteParam.prototype, "type", {
        /**
         * Gets the type of the parameter value.
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resolves the source string by walking the context object and returning the value.
     */
    RouteParam.prototype.resolve = function (context) {
        return null;
    };
    return RouteParam;
})();
exports.RouteParam = RouteParam;
//# sourceMappingURL=RouteParam.js.map