if (typeof __dirname != "undefined") this.parse = CSSPropertyTranslator;
function CSSPropertyTranslator(property, value, re, parse, bind) {
  // @license WTFPL - http://en.wikipedia.org/wiki/WTFPL
  bind = CSSPropertyTranslator.bind || function (o) {
    var self = this;
    return function () {
      return self.apply(o, arguments);
    };
  };
  value = "" + value;
  switch(property) {
    case 'border-radius':
      re = /^.+$/;
      parse = {parse:function (prefix, match) {
        return prefix + ":" + match;
      }};
      return "/* webkit */\n" + [
        value.replace(re, bind.call(function (match) {
          return this.parse("-webkit-border-radius", match);
        }, parse)),
        value.replace(re, bind.call(function (match) {
          return this.parse("border-radius", match);
        }, parse))
      ].join(";\n") + ";";
    case 'min-device-pixel-ratio':
      re = /\d*(?:\.\d*)/;
      parse = {parse:function (vendor, value) {
        if (vendor == "o") {
          // this case, opera only
          // a stupid way to transform
          // 1.5 into 3/2
          var
            splitted = value.split("."),
            multiply = Math.pow(10, (splitted[1] || "").length),
            decimal = splitted[0] * multiply,
            floating = splitted[1],
            divisor = Math.round(decimal / floating)
          ;
          return multiply == 1 ? value : (divisor * value) + "/" + divisor;
        }
      }};
      return "/* webkit, moz, o */\n" + [
        value.replace(re, bind.call(function (wholeMatch) {
          return "-webkit-min-device-pixel-ratio:" +
                 wholeMatch
          ;
        }, parse)),
        value.replace(re, bind.call(function (wholeMatch) {
          // the infamous prefix
          return "min--moz-device-pixel-ratio:" +
                 wholeMatch
          ;
        }, parse)),
        value.replace(re, bind.call(function (wholeMatch) {
          return "-o-min-device-pixel-ratio:" +
                 // the infamous parser
                 this.parse("o", wholeMatch)
                 // this object can be tested in isolation
                 // and compiled, considering self.parse is the only
                 // available method (so far)
          ;
        }, parse)),
        value.replace(re, bind.call(function (
          wholeMatch, // what RegExp found
      
          matchN,     // optional arg
                      // if no parentheses used
                      // N as one or more match[N]
      
          index,      // optional arg if you don't need it
          input       // optional arg if you don't need it
        ) {
          return "min-device-pixel-ratio:" +
                 wholeMatch
          ;
        }, parse))
      ].join(";\n") + ";";
  }
  return property + ":" + value + ";";
}