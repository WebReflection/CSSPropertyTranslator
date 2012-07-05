this["border-radius"] = {
  // could be used to validate too
  // "*": /(?:(?:\d+(?:\.\d+)?)(?:px|r?em)\s*)+/,
  // orit could be used to quick get everything
  "*": /^.+$/,
  // parse can be simply an helper
  // shared across cases
  parse: function (prefix, match) {
    return prefix + ":" + match;
  },
  webkit: function (match) {
    return this.parse("-webkit-border-radius", match);
  },
  "default": function (match) {
    return this.parse("border-radius", match);
  },
  test: function () {
    assert("default", this["default"]("2px") === "border-radius:2px");
    assert("default multi", this["default"]("1px 2em 3px 4rem") === "border-radius:1px 2em 3px 4rem"); 
    assert("webkit", this["default"]("2px") === "border-radius:2px"); 
    assert("webkit multi", this["default"]("1px 2em 3px 4rem") === "border-radius:1px 2em 3px 4rem"); 
  }
};
