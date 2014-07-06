function directionUnaryRecurse(_adic_func,direction) {
	if (arguments.length == 0) {
		return directionUnaryRecurse;
	}
	var num_arg = _adic_func.length,
		operation = direction != "left",
		recurse = function (arg_array,input) {
			var v = (operation 
					?Array(input).concat(arg_array)
					:arg_array.concat(input));
			if (arg_array.length + 1 == num_arg) {
				return _adic_func.apply(v);
			}
			else {
				return function (i) {
					return recurse(v,i);
				};
			}
		}
	return recurse(Array(),Array());
}

function curryNth ( /* func, value1, ..., valueN, position*/ ) 
	{
	var args = [].slice.call( arguments );
	var func = args.shift();
	var position = args.length > 2 ? args.pop() : 0;
	var values = args.slice( 1 );
	return function () 
		{
		var args = [].slice.call( arguments );
		[].splice.apply( args, [ position, 0 ].concat( values ) );
		return func.apply( this, args );
		}
	}

Function.prototype.curryNth = function curryNth ( /* value1, ..., valueN, position */ )  
	{
	var func = this;
	var values = [].slice.call( arguments );
	var position = values.length > 1 ? values.pop() : 0;
	return function () 
		{
		var args = [].slice.call( arguments );
		[].splice.apply( args, [ position, 0 ].concat( values ) );
		return func.apply( this, args );
		}
	}