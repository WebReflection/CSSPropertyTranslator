CSSPropertyTranslator
=====================
A collaborative and abstract way to obtain the right CSS out of a generic
property name / value

What
---
The project aim is to provide a tool able to accept any sort of CSS property
and produce an output compatible with as many browsers as possible.

How
---
You can simply fork or clone the project locally, create a *property-name.js*
file inside the [property](https://github.com/WebReflection/CSSPropertyTranslator/tree/master/property)
folder and use one ofthese commands to generate the build and test

    // generates the CSSPropertyTranslator.js file and run tests
    node generate

    // test directly returned values
    node translate min-device-pixel-ratio 1.5
    
    // test through the function via JS
    alert(CSSPropertyTranslator("min-device-pixel-ratio", 1.5));

    // test through node.js
    var CSSPT = require("./build/CSSPropertyTranslator").parse;
    CSSPT("min-device-pixel-ratio", 1.5);

    // generated output
    /* webkit, moz, o */
    -webkit-min-device-pixel-ratio:1.5;
    min--moz-device-pixel-ratio:1.5;
    -o-min-device-pixel-ratio:3/2;
    min-device-pixel-ratio:1.5;

The
[CSSPropertyTranslator.js](https://github.com/WebReflection/CSSPropertyTranslator/blob/master/build/CSSPropertyTranslator.js)
file is compiled runtime every time `node generate` is executed and only if all
tests pass.
To know more about property files structure and usage have a look into these
very first two examples:
[min-device-pixel-ratio.js](https://github.com/WebReflection/CSSPropertyTranslator/blob/master/property/min-device-pixel-ratio.js)
and
[border-radius.js](https://github.com/WebReflection/CSSPropertyTranslator/blob/master/property/border-radius.js).

Where
-----
The best place to use the generated file would be together with any tool you
are using to pre process all your CSS.
This module could be easily integrated with [less](http://lesscss.org/), as
example, as well as any other home made tool used to optimize CSS.
It is not a good idea to use the `CSSPropertyTranslator(name, value)` runtime
including a minified version of it in your website due performances and size
impact, however feel free to use this tool as much as you want and wherever you
need.

Why
---
These are interesting days where browsers vendors are pushing harder and harder
to promote any sort of *cool feature* and through CSS.
While sites such [CSS3 Generator](http://css3generator.com/) are nice to have,
I could not find any *abrastact enough* way to ask for a property and receive
all possible and potentially different browsers vendors implementations of the
same property and this is where everybody is welcome to enrich the property
folder with all possible combinations.
Remember that if the property has not been defined, it will return simply a
valid `property-name:value;` string as default.

Who
---
*Me, you, everybody ... everybody!*
Jokes a part, feel free to push here anything you want as long as there are
tests in place able to demonstrate some valid use case.
I will try to keep this project updated as much as possible but since
variations of new and old CSS are many I need other web developers to help me
maintaing such tool. Thanks!

TODO
----
npm publish in order to provide an easy way to include this project in another
one plus all possible CSS properties that need to be transformed as files with
tests.

License
-------

               DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                       Version 2, December 2004

    Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

    Everyone is permitted to copy and distribute verbatim or modified
    copies of this license document, and changing it is allowed as long
    as the name is changed.

               DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
      TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

     0. You just DO WHAT THE FUCK YOU WANT TO.
