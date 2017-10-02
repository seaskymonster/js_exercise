// https://segmentfault.com/a/1190000011389726

foo.call(this, arg1, arg2, arg3...)
foo.apply(this, [arg1, arg2....])
foo.bind(this);


call, apply 调用后立即执行
bind 调用后返回已绑定的this 的函数


........................................................................................
Usage:

1. 处理伪数组(arraylike object)

var arr = document.getElementByTagName('li');
arr.slice(1,4) // Error: arr doesn't have slice method



[].slice.call(arr, 1, 4);


2.继承

function person(name){
	this.name = name
}

function man(name){
	this.age = 'nan';
	person.call(this, name);

}


var me = new man('haiyangbinggan');

console.log(me.name, me.age) // 'haiyangbinggan' 'nan'


3.this 硬绑定 -- bind
// 将一个对象强制永久绑定到函数的this上, 

var fun;
var obj = {
	a: 1,
	foo : function(){
		var _this = this;
		fun = function(){
			console.log(_this.a);
		}
	}
}
obj.foo();
fun(); // 1

var obj1 = {a : 2}
obj.foo.call(obj1);
fun();//2


// 但是这种方法感觉上是在逃避问题，直接不适用this



var fun;
var obj = {
	a:1
	foo: function(){
		fun = function(){
			console.log(this.a);
		}.bind(this);
	}
}

var obj1 = {a: 2}
obj.foo(); 
fun();// 1



4. 数组的最大值，最小值

var num = [6,9,-3,-5];
console.log(Math.max.apply(Math, num)); // 9


5. 合并数组

   1.循环 2.Array的concat() 3. 使用apply()合并
   var a = [1,2,3];
   var b = [4,5,6];
   [].push.apply(a,b);    // 借用数组的push方法 等价 a.push(4,5,6);
   console.log(a);        // [1, 2, 3, 4, 5, 6]