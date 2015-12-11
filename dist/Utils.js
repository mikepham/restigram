/// <reference path="links.d.ts" />
var Utils;
(function (Utils) {
    function capitalize(value, all) {
        if (all === void 0) { all = false; }
        var sentence = [];
        var words = split(value, " ");
        words.forEach(function (value, index) {
            var word = value;
            if (all || index === 0) {
                var capitalized = value.toLowerCase();
                var first = capitalized[0].toUpperCase();
                word = first + capitalized.substring(1, capitalized.length);
            }
            sentence.push(word);
        });
        return sentence.join(" ");
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
    function select(collection, callback) {
        var results = [];
        if (collection instanceof Array) {
            collection.forEach(function (value, index) { return results.push(callback(value, index)); });
        }
        else {
            Object.keys(collection).forEach(function (key) { return results.push(callback(collection[key], key, collection)); });
        }
        return results;
    }
    Utils.select = select;
    function split(value, separator) {
        if (separator === void 0) { separator = ","; }
        var parts = value.split(separator);
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