export interface Platform {
  parse(html: string): any[];
  select(selector: string): any[];
}