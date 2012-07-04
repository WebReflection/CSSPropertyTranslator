function beautify(fn, spaces, inject) {
  spaces = ("" + fn).replace(/\r\n|\n\r|\r|\n/g, "\n" + spaces);
  return inject ? spaces.replace(/this\.(.+)/g, "$1") : spaces;
}
function generate(type) {
  output[type] = [];
  switch(type) {
    case "js":
      output[type].push(
        "function CSSPropertyTranslator(property, value, re, parse, bind) {",
        "  // " + license,
        "  bind = CSSPropertyTranslator.bind || function (o) {",
        "    var self = this;",
        "    return function () {",
        "      return self.apply(o, arguments);",
        "    };",
        "  };",
        "  value = \"\" + value;",
        "  switch(property) {"
      );
      break;
  }
  fs.readdirSync(dir).forEach(function (file) {
    file = path.join(dir, file.slice(0, -3));
    module = require(file);
    Object.keys(module).forEach(function (key) {
      test.push({
        name: key,
        test: module[key].test.bind(module[key])
      });
      vendors = Object.keys(module[key]).filter(function (key) {
        return !~["*", "test", "parse", "default"].indexOf(key);
      });
      vendors.push("default");
      switch(type) {
        case "js":
          output[type].push(
            "    case '" + key + "':",
            "      re = " + module[key]["*"] + ";",
            "      parse = {parse:" + beautify(module[key]["parse"] || "null", "    ") + "};",
            "      return [",
            "        " + vendors.map(function (key) {
              return "value.replace(re, bind.call(" + beautify(this[key], "      ") + ", parse))";
            }, module[key]).join(",\n        "),
            "      ].join(\";\\n\") + \";\";"
          );
          break;
      }
    });
  });
  switch(type) {
    case "js":
      output[type].push(
        "  }",
        "}"
      );
      break;
  }
  wru.test(test, function () {
    if (wru.status == "pass") {
      fs.writeFileSync(
        path.join(__dirname, "build", "CSSPropertyTranslator." + type),
        output[type].join("\n")
      );
    }
  });
}

var
  license = "@license WTFPL - http://en.wikipedia.org/wiki/WTFPL",
  path = require("path"),
  fs = require("fs"),
  wru = require(path.join(__dirname, "wru")),
  dir = path.join(__dirname, "property"),
  test = [],
  output = {},
  file, module, vendors
;

global.assert = wru.assert;
generate("js");