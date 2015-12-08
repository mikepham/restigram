export module Utils {
  export function contains(array: any[], value: any) {
    for (let index = 0; index < array.length; index++) {
      if (array[index] === value) {
        return true;
      }
    }
    return false;
  }

  export function expand(message: string, params: Object): string {
    return message.replace(/{(\w+)}/igm, (match, key) => {
      return params[key];
    });
  }

  export function format(message: string, values: string[]): string {
    return message.replace(/{(\d+)}/gm, (match, index) => {
      return values[index];
    });
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