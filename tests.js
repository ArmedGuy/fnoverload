var o = require('./overload')
, assert = require('assert')
, http = require('http')
, events = require('events');

var f1 = o(
	function(var1) {
		return 1;
	},
	function(var1, var2) {
		return 2;
	},
	function(var1, var2, var3, var4) {
		return 4;
	}
);

assert.equal(f1("derp"), 1, "one parameter should return 1");
assert.equal(f1("derp", "herp"), 2, "two parameters should return 2");

var f2 = o(
	o.f(String, http.Server,
	function(str, server) {
		return 1;
	})
)

assert.equal(f2("herp", http.createServer(function() {})), 1, "string and http.Server should return 1");