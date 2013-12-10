exports = module.exports = overload;
Function.prototype.expects = ".";
function overload(fns) {
	var functions = [];
	for(i in fns) {
		functions.push(fns[i]);
	}
	return function() {
		var argc = arguments.length, a = [];
		var argv = Array.prototype.slice.call(arguments);
		for(ar in argv) {
			a.push((typeof argv[ar]).toLowerCase());
		}
		a = a.join(",");
		for(i in functions) {
			if(functions[i].expects == a) 
				return functions[i].apply(this, argv);
		}
		for(i in functions) {
			if(functions[i].length == argc && functions[i].expects == ".") {
				return functions[i].apply(this, argv);
			}
		}
		throw new Error("No matching overload found!");
	}
}
exports.function = exports.f = function() {
	var argv = Array.prototype.slice.call(arguments);
	if(argv.length == 0) {
		throw new Error("Missing callback function in parameter list!");
	}
	var fn = argv.pop();
	var w = function() {
		fn.apply(this, argv);
	};
	for(i in argv) {
		if(typeof argv[i] !== 'string') {
			argv[i] = (typeof argv[i]).toLowerCase();
		} else {
			argv[i] = argv[i].toLowerCase();
		}
	}
	w.expects = argv.join(",");
	if(argv.length == 0) 
		w.expects = ".";
	return w;
}