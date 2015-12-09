export declare module Utils {
    function contains(array: any[], value: any, callback?: (index: number, value: any, array: any[]) => boolean): boolean;
    function expand(message: string, params: Object, callback?: (key: string, params: Object) => string): string;
    function format(message: string, values: string[], callback?: (key: string, values: string[]) => string): string;
    function variables(value: string, format?: {
        start: string;
        end: string;
    }): string[];
}
