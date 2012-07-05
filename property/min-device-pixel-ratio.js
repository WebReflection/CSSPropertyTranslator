// i.e.
// CSSPropertyTranslator(
//   "min-device-pixel-ratio",
//   1.5
// ); // will return a string such
// /* webkit, moz, o */
// -webkit-min-device-pixel-ratio:1.5;\n
// min--moz-device-pixel-ratio:1.5;\n
// -o-min-device-pixel-ratio:3/2;\n
// min-device-pixel-ratio: 1.5;

// this file will be compiled, translated
// and optimized after each push/build
// the property to export, as a node.js module,
// MUST be the CSS property you are trying to normalize
this["min-device-pixel-ratio"] = {

  // the star property is used as matching regular expression
  "*": /\d*(?:\.\d*)/,

  // the *optional* parse function
  // is useful to create different implementations
  // of the same CSS property
  "parse": function (vendor, value) {
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
  },

  // the default is what we expect from this prefix
  // each function is called as str.replace(re, oneDefinedParser)
  // so arguments are same expected by generic str.replace
  "default": function (
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
  },

  // all other vendor prefixes might have a different name
  // as it is for min--moz-* stuff so it's needed
  // to specify the whole returned value per each browser vendor
  "webkit": function (wholeMatch) {
    return "-webkit-min-device-pixel-ratio:" +
           wholeMatch
    ;
  },
  "moz": function (wholeMatch) {
    // the infamous prefix
    return "min--moz-device-pixel-ratio:" +
           wholeMatch
    ;
  },

  // in this specific case, Opera decided to use
  // a value not as as floating number ...
  // but as division between integers that will result
  // in that fraction ... in this case, this.parse(vendor, vaue)
  // is used to obtain a value that makes sense only for this browser
  "o": function (wholeMatch) {
    return "-o-min-device-pixel-ratio:" +
           // the infamous parser
           this.parse("o", wholeMatch)
           // this object can be tested in isolation
           // and compiled, considering self.parse is the only
           // available method (so far)
    ;
  },

  // the test method is a MUST have
  // the aim of this method is to test
  // that at least common cases are covered
  // if you push and the test method is not present
  // or is failing, your push won't be accepted
  "test": function () {
	  // bear in mind all property values will be converted into a string
	  // this happens within the function generator
    var value = "" + 1.5;
    assert("default", this["default"](value) === "min-device-pixel-ratio:1.5");
    assert("webkit", this.webkit(value) === "-webkit-min-device-pixel-ratio:1.5");
    assert("moz", this.moz(value) === "min--moz-device-pixel-ratio:1.5");
    assert("o", this.o(value) === "-o-min-device-pixel-ratio:3/2");
    // remember: the more you test, the more you cover, the more you are happy!
  }
};
