(function() {
	"use strict";
	
	exports = module.exports = overload;
	Function.prototype._expectsArguments = [];
	
	// Borrowed from https://github.com/Saneyan/Overload.js/
	function isMatch(obj1, obj2) {
		if ((typeof obj1 === 'undefined' && obj1 === obj2)
			|| ((typeof obj1).match(/boolean|function|string|number/) && obj1.constructor === obj2)
			|| (typeof obj2 === 'function' && obj1 instanceof obj2 && obj2 !== Object)
			|| (typeof obj1 === 'object' && ((obj1 === null && obj1 === obj2) || (obj1 !== null && obj1.constructor === obj2) || (obj1 instanceof obj2))
			)) {
		  return true;
		}
		return false;
	}
	function overload() {
		var functions = [];
		for(var i in arguments) {
			functions.push(arguments[i]);
		}
		return function() {
			var argc = arguments.length
			, a = []
			, argv = Array.prototype.slice.call(arguments)
			, match = true;
			for(var i in functions) {
				if(functions[i]._expectsArguments.length === argv.length) {
					match = true;
					for(var a in argv) {
						if(!isMatch(argv[a], functions[i]._expectsArguments[a])) {
							match = false;
							break;
						}
					}
					if(true === match) {
						return functions[i].apply(this, argv);
					}
				}
			}
			for(i in functions) {
				if(functions[i].length == argc 
					&& 0 === functions[i]._expectsArguments.length) {
					return functions[i].apply(this, argv);
				}
			}
			for(i in functions) {
				if(0 === functions[i].length) {
					return functions[i].apply(this, argv);
				}
			}
			throw new Error("No matching overload found!");
		}
	};
	exports.function = exports.f = function() {
		var args = Array.prototype.slice.call(arguments);
		if(0 === args.length) {
			throw new Error("Missing callback function in parameter list!");
		}
		var fn = args.pop();
		var w = function() {
			return fn.apply(this, arguments);
		};
		w._expectsArguments = [];
		for(var i in args) {
			w._expectsArguments.push(args[i]);
		}
		return w;
	};
})();