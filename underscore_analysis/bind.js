//https://github.com/hanzichi/underscore-analysis/issues/18
// bind 


es5 bind

bind 绑定this 返回的一个方法。

var obj = {
	a : 1,
	b : 2,
	getCount: function(c, d){
		return this.a + this.b +c +d;
	}
}

window.a = window.b = 0;
console.log(obj.getCount(3,4)); // 10
var func = obj.getCount;
console.log(funcion(3,4)) // 7


var func = obj.getCount.bind(obj); 
console.log(func(3,4)) //10



Function.prototype.bind = Function.prototype.bind || function(context){
	var that = this;
	var args = Array.prototype.slice.call(arguments)
	return function(){
		return that.apply(context, args.concat(Array.prototype.slice.call(arguments)); // that is function
	}
}

bind 返回的是一个未执行的function

func = obj.getCount.bind(obj) = function(obj){
	 return obj.getCount.apply(obj, arguments);
}


so func(3,4) 

=>  function(obj){
	return obj.getCount.apply(obj, arguments)
}(3,4)

=> obj.getCount.apply(obj, [3, 4]) // 10

..........................................................................................................................................

// fun.bind(thisArg [, arg1, arg2, [,...]])
第一个题目：

function fn(a, b ,c ){
	return a + b + c;
}

1) var _fn = fn.bind(null, 10);
   var ans = _fn(20, 30); 

what is the result ? 


_fn = fn.bind(null, 10)

= function(null){
	return fn.apply(null, [10].concat(Array.prototype.call(arguments)));
}


so: _fn(20, 30) = fn.apply(null, [10].[20, 30]) = fn.apply(null, [10,20,30]) = fn(10,20,30) = 60


2) var _fn= fn.bind(null, 10);
   var ans = _fn(20,30,40);

   what is the result ?

 so : _fn(20,30,40) = fn(10,20,30,40) = 10+20+30 = 60


第二个题目： 

function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// Create a function with a preset leading argument
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]

...........................................................................................................................................................

new
// 当时用new操作符调用绑定函数时候，bind的第一个参数无效。

function Person(name, age){
	this.name = name;
	this.age = age;
}

var _Person = Person.bind({});

var p = new _Person('hanzichi', 30);


what is p?

_Person = Person.bind({}) = Person.apply({}, arguments);


p = new _Person('hanzichi', 30)； // Person {name : "hanzichi", age: 30}



function Person(name, age) {
  this.name = name;
  this.age = age;
}

var _Person = Person.bind(null, 'hanzichi');
var p = new _Person(30); // Person {name: "hanzichi", age: 30}



.........................................................................................................................................

setTimeout

var canvas = {
	render: function(){
		this.update();
		this.draw();
	},

	update: function(){},
	draw: function(){}
}

window.setInterval(canvas.render, 1000/60);

render 方法中的this 其实指向了window ？ why 。。。。

fix : window.setInterval(canvas.render.bind(canvas), 1000);


..................................................................................................................................

tip   // 下面的内容不太明白


bind 还能做其他的：

1. 把一个类数组，convert to Array

一般这样做： var slice = Array.prototype.slice;

bind: 
  var unboundSlice = Array.prototype.slice;
  var slice = Function.prototype.call.bind(unboundSlice);