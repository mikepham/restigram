import { Platform } from "../interfaces/Platform";
export declare class Node implements Platform {
    parse(html: string): any[];
    select(selector: string): any[];
}
