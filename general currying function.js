function directionUnaryRecurse(_adic_func,direction) {
	if (arguments.length == 0) {
		return directionUnaryRecurse;
	}
	var num_arg = _adic_func.length,
		args = Array(),
		operation = (arguments.length == 1
					?'unshift'
					:(direction == "right"
						?'unshift'
						:(	direction == "left"
							?'push'
							:'unshift'))),
		recurse = function (input) {
			args[operation](input);
			if (args.length == num_arg) {
				return _adic_func.apply(args);
			}
			else {
				return recurse;
			}
		}
	return recurse;
}
function rightnaryRecurse(_adic_func) {
	if (arguments.length == 0) {
		return directionUnaryRecurse;
	}
	var num_arg = _adic_func.length,
		args = Array(),
		recurse = function (input) {
			args.unshift(input);
			if (args.length == num_arg) {
				return _adic_func.apply(args);
			}
			else {
				return recurse;
			}
		}
	return recurse;
}
function leftUnaryRecurse(_adic_func) {
	if (arguments.length == 0) {
		return directionUnaryRecurse;
	}
	var num_arg = _adic_func.length,
		args = Array(),
		recurse = function (input) {
			args.push(input);
			if (args.length == num_arg) {
				return _adic_func.apply(args);
			}
			else {
				return recurse;
			}
		}
	return recurse;
}