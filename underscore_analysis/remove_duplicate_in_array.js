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


Method 2: 