//https://github.com/hanzichi/underscore-analysis/issues/2
//underscore 里面 type 判断

1. Array
_.isArray = nativeIsArray || function(obj){
	return toString.call(obj) ==='[object Array]'
}

nativeIsArray == ES5 Array.isArray

toString == Object.prototype.toString


2. Function and Object (except null)

_.isObject = function(obj){
	var type = typeof obj;
	return type === 'function' || type === 'object' && !! obj;
}

3. Arguments, Function, String, Number, Date, RegExp, Error 
   // all of them can use toString
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name){
  	_['is' + name] = function(obj){
  		return toString.call(obj) === '[object ' + name +']';
  	}
  })


  But for IE<9,  for arguments Object.prototype.toString.call , the result is [object, Object]

  we can uses arguments.calle

  if(_.isArguments(arguments)){
  	_.isArguments = function(obj){
  		return _.has(obj, 'callee');
  	}
  } 

4. DOM
   
   nodeType == 1

   _.isElement = function(obj){
   	 return !!(obj && obj.nodeType == 1);
   } 

5. NaN

use NaN is a number and NaN != NaN
 
_.isNaN = function(obj){
	return _.isNumber(obj) && obj !== +obj; 
}