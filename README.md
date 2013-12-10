# Overload.js - Function overloading for JavaScript
There are several libraries out there that can do function overloading, but none have had an innocent enough syntax.
I hope that others will find my version easy to use.

### How to use:


```javascript
var _o = require('overload');


// Simple argument-count overloading
var func1 = _o([

	function(var1) {
		console.log("Single var: " + var1);
	},
	
	
	function(var1, var2) {
		console.log("Two vars: "  + var1 + "," + var2);
	}
]);



// More advanced, type-based overloading
var func2 = _o([

	_o.f("string", // expect string 
	function(str) {
		console.log("String: " + str);
	}),
	
	_o.f("string", "number", // expect string and a number
	function(str, num) {
		console.log("String is: " + str + ", num is: " + num);
	})
]);

func1("hi");
// outputs: Single var: hi

func1("hi", "hello");
// outputs: Two vars: hi,hello


func2("hi mate", 3);
// outputs: String is: hi mate, num is: 3

```