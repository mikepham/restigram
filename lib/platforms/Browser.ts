import {Platform} from "../interfaces/Platform";

export class Browser implements Platform {
  public parse(html: string): any[] {
    return [];
  }

  public select(selector: string): any[] {
    return [];
  }
}