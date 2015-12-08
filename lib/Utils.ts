let Utils = {
  contains: function contains(a, obj) {
    var i = a.length;
    while (i--) {
      if (a[i] === obj) {
        return true;
      }
    }
    return false;
  },
  variables: function variables(value: string, format: { start: string, end: string } = { start: "\{", end: "\}" }): string[] {
    let results: string[] = [];
    let regex = format.start + "(\w+)" + format.end;
    let matches = value.match(regex);

    matches.forEach(match => {
      if (!Utils.contains(results, match)) {
        results.push(match);
      }
    });

    return results;
  }
};

module.exports = Utils;