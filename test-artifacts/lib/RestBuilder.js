var RestBuilder = (function () {
    /**
     * Initializes a new instance of {RestBuilder}.
   * @constructor
     * @param {RestBuilderOptions} options - set of options to use when generating the API
     */
    function RestBuilder(options) {
        this._options = options;
    }
    Object.defineProperty(RestBuilder.prototype, "options", {
        /**
         * Gets the builder options.
         */
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds the route to the collection.
     */
    RestBuilder.prototype.add = function (route) {
        this._routes.push(route);
        this.build(route);
    };
    RestBuilder.prototype.build = function (route) {
    };
    return RestBuilder;
})();
exports.RestBuilder = RestBuilder;
//# sourceMappingURL=RestBuilder.js.map