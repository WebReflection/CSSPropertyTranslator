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
    case 'min-device-pixel-ratio':
      re = /\d*(?:\.\d*)/;
      parse = {parse:function (vendor, value) {
        // might be common use case
        // vendor SHOULD be one of these:
        // "webkit", "moz", "o"
        if (vendor == "o") {
          // this case, opera only
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