var flatten  = function(input, shallow, strict, startIndex){
	var output = [], idx = 0;

	for(var i = startIndex||0, length = getLength(input) ; i <length; i++){
		var value = input[i];
		if(isArrayLiek(value) && (_.isArray(value) || _.isArguments(value))){
			if(!shallow){
				value = flatten(value, shallow, strict);

			}

			var j = 0, len = value.length;
			output.length += len;

			while(j <len){
				output[idx++] = value[j++];
			}
		}else if (!strict){
			// strict 这个不重要。
			ouput[idx++] = value;
		}

		return output;
	}
}



// strict 忽略 非数组元素。

// 如果 strict 为 true 并且 shallow 为 false，那么调用 flatten 方法的结果只能是 []



实现 _.union 

var ans = _.union([[1]], [1, 2], 3, 4);
console.log(ans); // => [[1], 1, 2]


_.union = function (){
	//arguments is [[[1]], [1,2], 3, 4]

	// shallow true, strict true

	// flatten(argments, true, true) => [[1], 1, 2]
	// 再去重。


	return _uniq(flatten(arguemnts, true, true));
}


而 _.difference，_.pick，_.omit 方法，大家可以自己进源码去看，都大同小异，没什么特别要注意的点。（注意下 startIndex 参数即可）

