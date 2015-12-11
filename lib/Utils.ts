/// <reference path="links.d.ts" />

import {} from "humanize-plus";

export module Utils {
  export function capitalize(value: string, all: boolean = false): string {
    let sentence = [];
    let words = split(value, " ");

    words.forEach((value, index) => {
      let word: string = value;
      if (all || index === 0) {
        let capitalized = value.toLowerCase();
        let first = capitalized[0].toUpperCase();
        word = first + capitalized.substring(1, capitalized.length);
      }
      sentence.push(word);
    });
    return sentence.join(" ");
  }

  export function contains<T>(array: T[], callback: (value: T, index: number) => boolean): boolean;
  export function contains<T>(array: T[], value: T): boolean;
  export function contains<T>(array: T[], valueOrCallback: any): boolean {
    for (let index = 0; index < array.length; index++) {
      if (valueOrCallback instanceof Function && valueOrCallback(array[index], index)) {
        return true;
      } else if (array[index] === valueOrCallback) {
        return true;
      }
    }
    return false;
  }

  export function expand(message: string, callback: (key: string) => string): string;
  export function expand(message: string, params: Object): string;
  export function expand(message: string, paramsOrCallback: any): string {
    return message.replace(/{(\w+)}/igm, (match, key) => {
      if (paramsOrCallback instanceof Function) {
        return paramsOrCallback(key);
      } else if (paramsOrCallback) {
        return paramsOrCallback[key] || "";
      }
    });
  }

  export function format(message: string, callback: (key: string) => string): string;
  export function format(message: string, values: string[]): string;
  export function format(message: string, valuesOrCallback: any): string {
    return message.replace(/{(\d+)}/gm, (match, index) => {
      if (valuesOrCallback instanceof Function) {
        return valuesOrCallback(match);
      }
      return valuesOrCallback[index] || "";
    });
  }

  export function select<T>(collection: Object, callback: (value: any, key: string, collection: any) => T);
  export function select<T>(collection: any[], callback: (item: any, index: number) => T)
  export function select<T>(collection: any, callback: any) {
    let results: T[] = [];
    if (collection instanceof Array) {
      collection.forEach((value, index) => results.push(callback(value, index)));
    } else {
      Object.keys(collection).forEach(key => results.push(callback(collection[key], key, collection)));
    }
    return results;
  }

  export function split(value: string, separator: string = ","): string[] {
    let parts: string[] = value.split(separator);
    let results: string[] = [];
    parts.forEach(part => {
      let cleaned = part.trim();
      if (!contains(results, cleaned)) {
        results.push(cleaned);
      }
    });
    return results;
  }

  export class Token {
    public static default: Token = new Token();
    public start: string;
    public end: string;

    constructor(start?: string, end?: string) {
      this.start = start || "{";
      this.end = end || "}";
    }
  };

  export function variables(value: string, tokens: Token = Token.default): string[] {
    let results: string[] = [];
    let regex = tokens.start + "(.*?)" + tokens.end;
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