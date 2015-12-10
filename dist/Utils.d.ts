/// <reference path="../lib/links.d.ts" />
export declare module Utils {
    function capitalize(value: string): string;
    function contains<T>(array: T[], callback: (value: T, index: number) => boolean): boolean;
    function contains<T>(array: T[], value: T): boolean;
    function expand(message: string, callback: (key: string) => string): string;
    function expand(message: string, params: Object): string;
    function format(message: string, callback: (key: string) => string): string;
    function format(message: string, values: string[]): string;
    function split(value: string): string[];
    class Token {
        static default: Token;
        start: string;
        end: string;
        constructor(start?: string, end?: string);
    }
    function variables(value: string, tokens?: Token): string[];
}
