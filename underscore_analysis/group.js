_.groupBy & _.indexBy & _.countBy

// _.groupBy

_.groupBy([1.3, 2.1, 2.4], function(num){
	return Math.floor(num);
})  // {1 :[1.3], 2:[2.1, 2.4]}


_.groupBy(['one', 'two', 'three'], 'length';
) // {3:["one", "two"], 5:["three"]}


// _.indexBy

var stooges = [{name : 'moe', age: 40}, {name : 'larry', age: 50}, {name : 'curly', age : 60}];
_indexBy(stooges, 'age');
=> {
     "40":{name : 'moe', age : 40},
     "50":{name : 'larry', age : 50},
     "60":{name : 'curly', age : 60}
   }

_.indexBy 和 _.groupBy difference:

key - one object   vs key - one array

for _.indexBy, if key matches multiple object, choose the last, for example

var tmp = _.indexBy(['one', 'two', 'three'], 'length'); // {3: 'two', 5 : 'three'}



// _.countBy. key - value (value 是元素的个数)

_.countBy([1,2,3,4,5], function(num){
	return num % 2 == 0 ? 'even' : 'odd';
}); // {odd : 3, even :2}




var group = function(behavior){
	return function(obj, iteratee, context){
		var result = {};
		iteratee = cb(iteratee, context);
		_.each(obj, function(value, index){
			var key = iteratee(value, index, obj); // use the passed in iteratee function to generate the key
			behavior(result, value, key); // use the passed in behavior function to behave
		});

		return result;
	}


}

var behavior = function(result, value, key){
		if(_.has(result, key)) result[key].push(value);
		else result[key] = [value];
}

_.groupBy = group(behavior);
