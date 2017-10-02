// https://github.com/hanzichi/underscore-analysis/issues/3
// IN IE < 9. 被枚举的对象重写了某些键

var obj = {toString : 'hanzichi'};

for(var k in obj){
	alert(k);
}


// 在 chrome 中 出现 'hanzichi', 在IE 8 中, nothing to show


// In IE 8. toString is defined as "不可枚举" 的 属性

//那么如何找到所有被重写 而不能在IE8 中被枚举的属性呢。

var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

function collectNonEnumProps(obj, keys){
	var nonEnumIdx = nonEnumerableProps.length;
	var constructor = obj.constructor;

	var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto; 
	// if constructor 没被重写， prop = obj.constructor.prototype
	// if constructor 被重写, prop = Object.prototype

	var prop = 'constructor';

	if(_.has(obj, prop) && _.contains(keys, prop)) keys.push(prop);   // 如果 obj非原型链上有 'constructor' .. 
    // if obj has 'constructor' 这个key, and key is not existed in keys, push it to keys.

    while(nonEnumIdx--){
    	prop = nonEnumerableProps[nonEnumIdx];
        //就是验证一个property 是否被重写了，如果被重写了，obj[prop] != proto[prop];
    	if(porp in obj && obj[prop] != proto[prop] && !_.contains(keys, prop)){
    		keys.push(prop)
    	}
    }

} 


// below is _.has
_.has is used for checint if an object has a given property directly.

_.has = function(obj, key){
	return obj != null && hasOwnProperty.call(obj, key);
}