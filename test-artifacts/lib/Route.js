var RouteParamKind_1 = require("./RouteParamKind");
var RouteParamNotFound_1 = require("./RouteParamNotFound");
var Route = (function () {
    /**
     * Initializes a new instance of {Route}.
     * @constructor
     * @param {string} id - unique identifier for the route
     * @param {string} method - HTTP method to use when calling the route
     * @param {string} path - path to the specified route resource
     * @param {string} url - url to the route.
     * @param {RouteParam[]} params - parameters for the route including headers, request, query, and variable
     * @param {string} group - group to use when generating the API
     * @param {string} name - name of the route
     */
    function Route(id, method, path, url, params, group, name) {
        this._group = group;
        this._id = id;
        this._method = method;
        this._name = name;
        this._params = params;
        this._path = path;
        this._url = url;
    }
    Object.defineProperty(Route.prototype, "group", {
        /**
         * Gets the group to assign the route to when generating API methods.
         */
        get: function () {
            return this._group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "id", {
        /**
         * Gets the unique identifier for the route.
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "method", {
        /**
         * Gets the method used for the route.
         */
        get: function () {
            return this._method;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "name", {
        /**
         * Gets the name of the route.
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "params", {
        /**
         * Gets the names of the parameters.
         */
        get: function () {
            var names = [];
            this._params.forEach(function (x) { return names.push(x.name); });
            return names;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "path", {
        /**
         * Gets the path for the route.
         */
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "url", {
        /**
         * Gets the url for the route.
         */
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns an object that represents a request to the route.
     * @param {any} context - a context object to use when walking source strings
     */
    Route.prototype.createRequest = function (context, includeOptionals) {
        var request = {};
        this.request().forEach(function (param) {
            var included = param.optional && !includeOptionals ? false : true;
            if (included) {
                request[param.name] = param.resolve(context);
            }
        });
        return request;
    };
    /**
     * Returns a URL that has been parsed and replaced with values.
     */
    Route.prototype.createUrl = function () {
        return this._url;
    };
    /**
     * Gets the collection of header parameters.
     */
    Route.prototype.headers = function () {
        var params = [];
        this._params.forEach(function (param) {
            if (param.kind === RouteParamKind_1.RouteParamKind.Header) {
                params.push(param);
            }
        });
        return params;
    };
    /**
     * Gets the specified named parameter.
     */
    Route.prototype.param = function (name) {
        for (var index = 0; index < this._params.length; index++) {
            var param = this._params[index];
            if (param.name === name) {
                return param;
            }
        }
        throw new RouteParamNotFound_1.RouteParamNotFound(name);
    };
    /**
     * Gets the collection of query parameters.
     */
    Route.prototype.query = function () {
        var params = [];
        this._params.forEach(function (param) {
            if (param.kind === RouteParamKind_1.RouteParamKind.Query) {
                params.push(param);
            }
        });
        return params;
    };
    /**
     * Gets the collection of request parameters.
     */
    Route.prototype.request = function () {
        var params = [];
        this._params.forEach(function (param) {
            if (param.kind === RouteParamKind_1.RouteParamKind.Request) {
                params.push(param);
            }
        });
        return params;
    };
    /**
     * Gets the collection of variable parameters.
     */
    Route.prototype.variables = function () {
        var params = [];
        this._params.forEach(function (param) {
            if (param.kind === RouteParamKind_1.RouteParamKind.Variable) {
                params.push(param);
            }
        });
        return params;
    };
    return Route;
})();
exports.Route = Route;
//# sourceMappingURL=Route.js.map