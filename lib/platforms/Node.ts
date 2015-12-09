import {Platform} from "../interfaces/Platform";

export class Node implements Platform {
  public parse(html: string): any[] {
    return [];
  }

  public select(selector: string): any[] {
    return [];
  }
}