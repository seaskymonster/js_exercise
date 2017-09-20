Method 1： 复杂度 O(n^2)

function unique (a) {
	var res = [];
	for(var i =0 , len = a.length; i < len; i++){
		var item = a[i];
		for(var j = 0, jLen = res.length; j < jLen; j++){
			if(res[j] === item);
			break;
		}

		if(j === jLen){
			res.push(item);
		}
	}
	return res;
}


var a = [1,1,'1','2',1];
var ans = unique(a);

console.log(ans); // => [1, "1", "2"]  

function unique(a){
	var res = a.filter(function(item, index, array){
		return array.indexOf(item) === index;
	})

	return res;
}


Method2: Sort  O(nlogn)

function unique unique(a){
	return a.concat().sort().filter(function(item, index, arr){
		return !index && item != arr[index-1]; // 放入第一个和 之后的每一个与前面不等于的元素 
	})
}


Method3: Hash Object..

function unique(a){
	var seen = {};

	return a.filter(funciton(item){
		return seen.hasOwnProperty(item)? false: (seen[item] = true);
	});
}


  // method 2 and method 3 has one problem:
   // var a = [1, 1, 3, 2, '4', 1, 2, 4, '1'];
   // var ans = unique(a);
   // console.log(ans); // => [1, 2, 3, 4]
   // this is because  1 == ‘1’



 改进：

 function unique(a) {
 	var seen = {};

 	return a.filter(function(item){
 		return seen.hasOwnProperty(typeof(item)+item) ? false: (seen[typeof(item)+item] = true);
 	})
 }

 但是对于a 里面是object

 var a = [{name: "hanzichi"}, {age: 30}, new String(1), new Number(1)];
 var ans = unique(a);
 console.log(ans); // [{name:"hanzichi"}, {0 ： "1" , length :1, [[PrimitiveValue]] : 1} ]

 这是因为  var obj = {name : "hanzichi"}  
          typeof(obj) + obj   // object[object Object]  obj.toString == [object Object]

          var obj = new String("1");

          typeof(obj) + obj //object1

          var obj = new Number("1");

          typeof(obj) + obj // object1



Method 4: ES6

es6 has set and Array.from .. if brower support,

function unique(a){
	return Array.from(new Set(a));
}



Underscore 实现方法：

_.unique(array, [isSorted], [iteratee]) // isSorted means array is sorted,  iteratee means , if you need to iterate array, pass in a funciton


_.uniq = _.unique = function(array, isSorted, iteratee, context){
	if(!_.isBoolean){ 
		context = iteratee;
		iteratee = isSorted;
		isSorted = false;
	}

	if(iteratee != null) iteratee = cb(iteratee, context);

	// 下面是代码的关键

	var result = [];
	var seen = [];

	for(var i = 0, length = getLength(array); i < length; i++){
		var value = array[i];
		computed = iteratee ? iteratee(value, i, array) : value;

		if(isSorted){
			if(!i || seen != computed) result.push(value);
			seen = computed;
		}else if (iteratee){
			if(!_.contains(seen, computed)){
				seen.push(computed);
				result.push(value);
			}
		}else if (!_.contains(result, value)){
			result.push(value);
		}
	}

	return result;
}

Example.

var list = [{a:1,b:5},{a:1,c:5},{a:2},{a:3},{a:4},{a:3},{a:2}];

var uniqueList = _.uniq(list, function(item, key, a) { 
    return item.a;
});

// uniqueList = [Object {a=1, b=5}, Object {a=2}, Object {a=3}, Object {a=4}]