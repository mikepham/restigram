(function (RouteAuth) {
    RouteAuth[RouteAuth["None"] = 0] = "None";
    RouteAuth[RouteAuth["Basic"] = 1] = "Basic";
    RouteAuth[RouteAuth["Digest"] = 2] = "Digest";
    RouteAuth[RouteAuth["OAuth"] = 3] = "OAuth";
    RouteAuth[RouteAuth["OAuth2"] = 4] = "OAuth2";
})(exports.RouteAuth || (exports.RouteAuth = {}));
var RouteAuth = exports.RouteAuth;
//# sourceMappingURL=RouteAuth.js.map