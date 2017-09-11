var eq = function(a, b, aStack, bStack){
	// 需要注意的是 0 === -0, this is true, but they aren't identical
    // if a === b and a ! =0 ; return true;
    // if a === b and a === 0;  if (a = +0, b = -0) => 1/a = + Infinity; 1/b = - Infinity; so 1/a != 1/b;
	if(a === b) return a !== 0 || 1/a === 1/b;  

	if(a == null || b == null) return a === b; // if a or b is null or undifined,  就判断 a === b;
   
    // unwrap any wrapped objects;
	if(a instanceof _) a = a._wrapped;
	if(b instanceof _) b = b._wrapped;

	var className = toString.call(a);
	if(className != toString.call(b)) return false;

	switch (className){
		case '[object RegExp]' :
		case '[object String]' :
		    // Primitives and their correspoing object wrappers are equivalent; thus `"5"` is equivalent to `new String("5")`
		    对于string ， 只能有'' +  来判断是否相同，因为 +"aaa"  = NaN ,不是数字。 所以不能用 +a 来判断  
		    return '' +a === '' +b;
		case '[object Number]' :  // 我们需要考虑4种， Number（） ， 0 ， 123， NaN
		    if(+a !== +a) return +b != +b;  用来判断 NaN 的，我们认为两个NaN 是equal的。
		    // +a 将 Number() 形式转为基本类型。 +Number(1) ==> 1

		    return +a === 0 ? 1/+a === 1/b : +a === +b；

		case '[object Date]' :
		case '[object Boolean]':
		    return +a === +b;  //date 和 boolean 可以用 +a 来转化成数字  data   var a = true; console.log(+a) //1
   
	}

	var areArrays = className ==='[object Array]';

	if(!areArrays) {
		if(typeof a != 'object' || typeof b != 'object') return false;

		// 以下 a和b 都是 object

		// objects with different constructors are not equivalent, but 'Object' or 'Array' from different frames are

		var aCtor = a.constructor, bCtor = b.constructor;
		// 下面不太懂。
		if(aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)){
			return false;
		}
		
	} 

	aStack = aStack || [];
	bStack = bStack || [];

	var length = aStack.length;

	while(length--){
		// linear search, performace is inversely proportional to the number of unique nested structures.
		// 没明白，这个check 干什么用。
		if(aStack[length] === a) return bStack[length] === b;
	}

	aStack.push(a);
	bStack.push(b);
    
    // Recursively compare objects and arrays
	if(areArrays){
		length = a.length;
		if(length !== b.length) return false; // 长度不相等，比个鸡毛。
		while(length--){
			if(!eq(a[length], b[length], aStack, bStack)) return false;
		}
	}else{
		//deep compare objects.
		var keys = _.keys(a), key;
		length = keys.length;
		if(_.keys(b).length != length) return false;
		while(length--){
           key = keys[length];
           if(!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
		}
	}

	aStack.pop();
	bStack.pop();

	return true;
} 

