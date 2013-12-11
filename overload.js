exports = module.exports = overload;
Function.prototype._expectsInstance = [];

// Borrowed from https://github.com/Saneyan/Overload.js/
function isMatch(obj1, obj2) {
	if ((typeof obj1 === 'undefined' && obj1 === obj2)
		|| ((typeof obj1).match(/boolean|function|string|number/) && obj1.constructor === obj2)
		|| (typeof obj2 === 'function' && obj1 instanceof obj2 && obj2 !== Object)
		|| (typeof obj1 === 'object' && ((obj1 === null && obj1 === obj2) || (obj1 !== null && obj1.constructor === obj2))
		)) {
	  return true;
	}
	return false;
}
function overload() {
	var functions = [];
	
	var advOl = false;
	for(i in arguments) {
		if((!arguments[i] instanceof Function)) {
			advOl = true;
		}
		functions.push(arguments[i]);
	}
	if(advOl) {
		functions = [];
		exports.f.apply(this, arguments);
	}
	return function() {
		var argc = arguments.length
		, a = []
		, argv = Array.prototype.slice.call(arguments)
		, match = true;
		for(i in functions) {
			if(functions[i]._expectsInstance.length == argv.length) {
				match = true;
				for(a in argv) {
					if(!isMatch(argv[a], functions[i]._expectsInstance[a])) {
						match = false;
						break;
					}
					console.log(argv[a]);
				}
				if(match == true)
					return functions[i].apply(this, argv);
			}
		}
		for(i in functions) {
			if(functions[i].length == argc && functions[i]._expectsInstance.length == 0) {
				return functions[i].apply(this, argv);
			}
		}
		for(i in functions) {
			if(functions[i].length == 0) {
				return functions[i].apply(this, argv);
			}
		}
		throw new Error("No matching overload found!");
	}
}
exports.function = exports.f = function() {
	var args = Array.prototype.slice.call(arguments);
	if(args.length == 0) {
		throw new Error("Missing callback function in parameter list!");
	}
	var fn = args.pop();
	var w = function() {
		fn.apply(this, arguments);
	};
	w._expectsInstance = [];
	for(i in args) {
		w._expectsInstance.push(args[i]);
	}
	return w;
}