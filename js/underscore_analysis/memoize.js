Fibonacci



let fibonacci = function(){
	let cache = {};
	return function (n){
	   if(!cache[n])
	      cache[n] = n <2? n : fibonacci(n-2) + fibonacci(n-1);
	   return cache[n];
	}

}();



我们可以用 memorize函数封装起来。

let memoize = function(func){
	let cache = {};
	return function(key){
	   if(!cache[key]) cache[key] = func.apply(this, arguments);
	   return cache[key];
	}
}


let fibonacci = memoize(function(n){
	  return n < 2 ? n : fibonacci(n-2) + fibonacci(n-1);
})



underscore 实现方法


_.memozie = function(func, hasher){
	var memoize = function(key){
	   var cache = memozie.cache;

	   var address = '' + (hasher ? hasher.apply(this, arguments) : key);

	   if(!_.has(cache, address)) cache[address] = func.apply(this, arguments);

	   return cache[address];
	}

	memoize.cache = {};
	return memoize;
}