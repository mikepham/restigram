import { Platform } from "../interfaces/Platform";
export declare class Browser implements Platform {
    parse(html: string): any[];
    select(selector: string): any[];
}
