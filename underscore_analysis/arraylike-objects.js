array-like,  有length 属性，且属性值为非负Number类型即可。

比如： nodelist， html collections, 仔细想想，还有字符串。


1. Array-like to Array-like

arguments.

function fn(){
	var arr = [];
	for(var i = 0, len = arguments.length; i < len; i++){
		arr[i] = arguments[i];
	}
}

function fn(){
	var arr = Array.prototype.slice.call(arguments);
}


function fn(){
	var arr = [].slice.call(arguments);
}



in es6:

var str = "helloworld";
var arr = Array.from(str); // ["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"];

Array.prototype.slice.call(nodes) 在IE下会抛出错误。

function nodeListToArray(nodes){
	var arr, length;

	try{
		arr = [].slice.call(nodes);
		return arr;
	}catch(err){
		arr = [];
		length = nodes.length;
		for(var i = 0; i < length; i++){
			arr.push(nodes[i]);
		}
		return arr;
	}
}