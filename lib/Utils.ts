export module Utils {
  export function contains(array: any[], value: any) {
    for (let index = 0; index < array.length; index++) {
      if (array[index] === value) {
        return true;
      }
    }
    return false;
  }

  export function expand(message: string, params: [{ name: string, value: string }]): string {
    let formatted = message;
    params.forEach(nvp => {
      let name = nvp.name;
      let value = nvp.value;
      formatted = formatted.replace(name, value);
    });
    return formatted;
  }

  export function format(message: string, values: string[]): string {
    let formatted = message;
    values.forEach(index => {
      let value = values[index];
      formatted = formatted.replace("{" + index + "}", value);
    });
    return formatted;
  }

  export function variables(value: string, format: { start: string, end: string } = { start: "\{", end: "\}" }): string[] {
    let results: string[] = [];
    let regex = format.start + "(.*?)" + format.end;
    let regexp = new RegExp(regex, "g");
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