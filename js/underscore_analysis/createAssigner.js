
underscore 里面的api：

_.extend , _.extendOwn , _.defaults


object a and b, 将所有b的key-value 加到a上去。


function extend(a, b){
	for(var key in b){
		a[key] = b[key];
	}
	return a;
}



_.extend 就像上面那个，
_.extendOwn 就是把b 的 own properties给a
_.defaults 和 _.extend 类似， 但是呢, 会取第一次出现key的value.


在underscore，用createAssigner 实现

_.extend = createAssinger(_.allKeys);
_.extendOwn = createAssinger(_.keys);
_.defaults = createAssinger(_.allKeys, true);



var createAssinger = function(keysFunc, undefinedOnly){
	return function(obj){
		var length = arguments.length;
		if(length < 2 || obj == null) return obj; //只传入一个参数，或者传入的第一个参数是null， 那就直接返回第一个

		for(var index = 1; index < length; index++){
			var source = arguments[index];
                       
			keys = keysFunc(source);
            // keysFunc is _.keys;
            
			l = keys.length;

			for(var i = 0; i < l ; i++){
				var key = key[i];
				if(!undefinedOnly || obj[key] === void 0){
					obj[key] = source[key];
				}
			}
		}
	}
}