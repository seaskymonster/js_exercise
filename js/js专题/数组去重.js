
1.双层循环， 兼容性好。
2.indexOf
3.排序后去重。 sortedArray = array.concat().sort();  
4.Unique API.

   function unique(array, isSorted){
   	var res = [];
   	var seen = [];

   	for(var i = 0, len = array.length; i < len; i++){
   		var value = array[i];
   		if(sorted){
   			if(!i || seen != value){
   				result.push(value);
   			}
   			seen = value;
   		}else{
   			if(res.indexOf(value) === 1){
   				res.push(value);
   			}
   		}
   	}

   	return res;
   }


5. es5 : filter

   function unique(array){
   	 var res = array.filter(function(item, index, array){
   	 	return array.indexOf(item) === index;
   	 })
   	 return res;
   }

   function unique(array){
   	var res = array.concat().sort().filter(function(item, index, array){
   		return !index || item != array[index-1];
   	})
   }

6. 用object键值：

   function unique(array){
   	 var obj = {};
   	 return array.filter(function(item, index, array){
   	 	return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
   	 })
   }

  var array = [{value: 1}, {value: 1}, {value: 2}]; 这种情况 typeof item + item 就不够用了，所以用上面的这种写法。


7.es6:

   function unique(array){
   	 return Array.from(new Set(array));
   }

   function unique(arr){
   	 const seen = new Map()
   	 return arr.fiter((a)=> !seen.has(a) && seen.set(a,1));
   }
