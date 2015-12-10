/// <reference path="links.d.ts" />
var Utils;
(function (Utils) {
    function capitalize(value) {
        var capitalized = value.toLowerCase();
        var first = capitalized[0].toUpperCase();
        return first + capitalized.substring(1, capitalized.length);
    }
    Utils.capitalize = capitalize;
    function contains(array, valueOrCallback) {
        for (var index = 0; index < array.length; index++) {
            if (valueOrCallback instanceof Function && valueOrCallback(array[index], index)) {
                return true;
            }
            else if (array[index] === valueOrCallback) {
                return true;
            }
        }
        return false;
    }
    Utils.contains = contains;
    function expand(message, paramsOrCallback) {
        return message.replace(/{(\w+)}/igm, function (match, key) {
            if (paramsOrCallback instanceof Function) {
                return paramsOrCallback(key);
            }
            else if (paramsOrCallback) {
                return paramsOrCallback[key] || "";
            }
        });
    }
    Utils.expand = expand;
    function format(message, valuesOrCallback) {
        return message.replace(/{(\d+)}/gm, function (match, index) {
            if (valuesOrCallback instanceof Function) {
                return valuesOrCallback(match);
            }
            return valuesOrCallback[index] || "";
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
    var Token = (function () {
        function Token(start, end) {
            this.start = start || "{";
            this.end = end || "}";
        }
        Token.default = new Token();
        return Token;
    })();
    Utils.Token = Token;
    ;
    function variables(value, tokens) {
        if (tokens === void 0) { tokens = Token.default; }
        var results = [];
        var regex = tokens.start + "(.*?)" + tokens.end;
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