
_.findIndex
_.findLastIndex
_.indexOf
_.lastIndexOf
_.sortIndex


var arr = [1,2,5,2,4,6];

var isEven = function(num){
	return !(num&1);
}

var idx = _.findIndex(arr, isEven); // 3



underscore :

// dir === 1 , 从 前往后找
// dir === -1, 从 后往前找

function createPredicateIndexFinder(dir){
	return function (array, predicate, context){
		predicate = cb(predicate, context);

		var length = getLength(array);
        // the start position     
		var index = dir > 0 ? 0 :length-1;

		for(; index >=0 && index < length; index += dir){
			if(predicate(array[index], index, array)) return index;
		}

		return -1;
	}
}

_.findIndex = createPredicateIndexFinder(1);
_.findLastIndex = createPredicateIndexFinder(-1);

=> _.findIndex = function(array, predicate, context){};




var objects = [{'x' : 4}, {'x' : 5}];
_sortedIndex = (objects, {'x' : 4}, function(o){ return o.x;}); // 0

_.sortedIndex = function(array, obj, iteratee, context){ //用二分法，找到合适的插入位置
	iteratee = cb(iteratee, context, 1);
    // 经过迭代函数计算的值
	var value = iteratee(obj);

	var low = 0, high = getLength(array);
	while(low < high){ 
		var mid = Math.floor((low + high) /2);
		if(iteratee(array[mid]) < value) low = mid + 1; 
		else high = mid;
	}

	return low;
}



_.indexOf and _.lastIndexOf  

//es5 has indexOf and lastIndexOf, but IE < 9 doesn't support it.


function createIndexFinder (dir, predicatedFind, sortedIndex){
	return function(array, item, idx){ // array, 要找的index ， 从哪个开始 
		var i = 0; length = getLength(array);

		if(typeof idx == 'number'){ // if idx is negative, it used as offset from the end of array.
			if(dir > 0){
				i = idx >= 0 ? idx : Math.max(idx+length, i);
			}else{ 
				length = idx>= 0 ? Math.min(idx+1, length) : idx + length + 1;
			}
		}else if (sortedIndex && idx && length){
			idx = sortedIndex (array, item); // 用 _.sortedIndex,找到插入 item 的位置
			return array[idx] === item ? idx : -1; // if array[idx] == item, return idx, other, not find 
		}

		if(item !== item){ // NaN
			idx = predicatedFind(slice,call(array, i, length), _.isNaN); //把array ,截出来，找到isNaN
			return idx >= 0 ? idx+i : -1; //idx+i
		}

		for(idx = dir>0? i: length -1; idx >=0 && idx <length; idx += dir){
           if(array[idx] === item) return idx;
        }

        return -1;
	}
}


_.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
_.lastIndexOf = createIndexFinder(-1, _.findLastIndex); // 我也不理解，这个是啥意思。