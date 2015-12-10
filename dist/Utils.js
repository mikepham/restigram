/// <reference path="links.d.ts" />
var Utils;
(function (Utils) {
    function capitalize(value) {
        var capitalized = value.toLowerCase();
        var first = capitalized[0].toUpperCase();
        return first + capitalized.substring(1, capitalized.length);
    }
    Utils.capitalize = capitalize;
    function contains(array, value, callback) {
        for (var index = 0; index < array.length; index++) {
            if (callback && callback(index, array[index], array)) {
                return true;
            }
            else if (array[index] === value) {
                return true;
            }
        }
        return false;
    }
    Utils.contains = contains;
    function expand(message, params, callback) {
        return message.replace(/{(\w+)}/igm, function (match, key) {
            if (callback) {
                return callback(match, params);
            }
            return params[key] || "";
        });
    }
    Utils.expand = expand;
    function format(message, values, callback) {
        return message.replace(/{(\d+)}/gm, function (match, index) {
            if (callback) {
                return callback(match, values);
            }
            return values[index] || "";
        });
    }
    Utils.format = format;
    function split(value) {
        var parts = value.split(",");
        var results = [];
        parts.forEach(function (part) {
            var cleaned = part.trim();
            if (!contains(results, cleaned)) {
                results.push(cleaned);
            }
        });
        return results;
    }
    Utils.split = split;
    function variables(value, format) {
        if (format === void 0) { format = { start: "\{", end: "\}" }; }
        var results = [];
        var regex = format.start + "(.*?)" + format.end;
        var regexp = new RegExp(regex, "igm");
        var match = regexp.exec(value);
        while (match) {
            var token = match[1];
            if (!Utils.contains(results, token)) {
                results.push(token);
            }
            match = regexp.exec(value);
        }
        return results;
    }
    Utils.variables = variables;
})(Utils = exports.Utils || (exports.Utils = {}));
//# sourceMappingURL=Utils.js.map