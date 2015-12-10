/// <reference path="../lib/links.d.ts" />
export declare module Utils {
    function capitalize(value: string): string;
    function contains(array: any[], value: any, callback?: (index: number, value: any, array: any[]) => boolean): boolean;
    function expand(message: string, params: Object, callback?: (key: string, params: Object) => string): string;
    function format(message: string, values: string[], callback?: (key: string, values: string[]) => string): string;
    function split(value: string): string[];
    function variables(value: string, format?: {
        start: string;
        end: string;
    }): string[];
}
