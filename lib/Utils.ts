/// <reference path="links.d.ts" />

export module Utils {
  export function capitalize(value: string): string {
    let capitalized = value.toLowerCase();
    let first = capitalized[0].toUpperCase();
    return first + capitalized.substring(1, capitalized.length);
  }

  export function contains(array: any[], value: any, callback?: (index: number, value: any, array: any[]) => boolean) {
    for (let index = 0; index < array.length; index++) {
      if (callback && callback(index, array[index], array)) {
        return true;
      } else if (array[index] === value) {
        return true;
      }
    }
    return false;
  }

  export function expand(message: string, params: Object, callback?: (key: string, params: Object) => string): string {
    return message.replace(/{(\w+)}/igm, (match, key) => {
      if (callback) {
        return callback(match, params);
      }
      return params[key] || "";
    });
  }

  export function format(message: string, values: string[], callback?: (key: string, values: string[]) => string): string {
    return message.replace(/{(\d+)}/gm, (match, index) => {
      if (callback) {
        return callback(match, values);
      }
      return values[index] || "";
    });
  }

  export function split(value: string): string[] {
    let parts: string[] = value.split(",");
    let results: string[] = [];
    parts.forEach(part => {
      let cleaned = part.trim();
      if (!contains(results, cleaned)) {
        results.push(cleaned);
      }
    });
    return results;
  }

  export function variables(value: string, format: { start: string, end: string } = { start: "\{", end: "\}" }): string[] {
    let results: string[] = [];
    let regex = format.start + "(.*?)" + format.end;
    let regexp = new RegExp(regex, "igm");
    let match = regexp.exec(value);
    while (match) {
      let token = match[1];
      if (!Utils.contains(results, token)) {
        results.push(token);
      }
      match = regexp.exec(value);
    }
    return results;
  }
}