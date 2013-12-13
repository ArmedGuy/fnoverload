# fnoverload - Function overloading for JavaScript
[![Build Status](https://travis-ci.org/ArmedGuy/fnoverload.png?branch=master)](https://travis-ci.org/ArmedGuy/fnoverload)
There are several libraries out there that can do function overloading, but none have had an innocent enough syntax for me.
I hope that others will find my version easy to use.

Please remember that unlike true overloading, this is psuedo-overloading that is performed in runtime.
I have not benchmarked it in any way

### How to use:


```javascript
var o = require('fnoverload');


// Simple argument-count overloading
var func1 = o(

	function(var1) {
		console.log("Single var: " + var1);
	},
	
	
	function(var1, var2) {
		console.log("Two vars: "  + var1 + "," + var2);
	}
);



// More advanced, type-based overloading
var func2 = o(

	// expects string
	o.function(String,
	function(str) {
		console.log("String: " + str);
	}),
	
	// expect string and a number, both "o.function" and "o.f" works
	o.f(String, Number, 
	function(str, num) {
		console.log("String is: " + str + ", num is: " + num);
	})
);

func1("hi");
// outputs: Single var: hi

func1("hi", "hello");
// outputs: Two vars: hi,hello


func2("hi mate", 3);
// outputs: String is: hi mate, num is: 3

```

Both methods(simple and advanced) can be mixed in an var func = o(...) statement, but type-based functions will be chosen before argument-count
