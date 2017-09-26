// NaN & Number.NaN

Not a Number


Object.prototye.toString.call(NaN)  // [object Number]

Object.prototype.toString.call(Number.NaN) // [object Number]

1.  isNaN & Number.isNaN

NaN == NaN  NaN === NaN // both of them are false


Use isNaN to test 

isNaN(NaN) // true
isNaN(undefined) // true
isNaN({}) // true
isNaN("abc") // true

参数都会先转换成Number类型，然后进行判断
如下：

Number(NaN) // NaN
Number(undefiend) // NaN
Number({})//NaN
Number("abc")// NaN


What the difference between Number.isNaN and isNaN

Number.isNaN 不会强制将参数转化为数字，只有在参数是真正的数字且值为NaN的时候，才会返回ture

Number.isNaN(NaN) // true
Number.isNaN(undefiend) // false



So

isNaN = function(value){
	Number.isNaN(Number(value));
}

Number.isNaN = Number.isNaN || function(value){
	return typeof value ==="number" && isNaN(value);
}



2. _.isNaN // how underscore implement this 

官方文档： this is not the same as the native isNaN function, which will also return for many other not-number values, such as undefined

edge version:

_.isNaN = function(obj){
	return _.isNumber(obj) && isNaN(obj);
}


但是 1.8.3 其实是这样实现的：

_.isNaN = function(obj){
	return _.isNumber(obj) && obj !== +obj;
}

这是有bug的  _.isNaN(new Number(0)) ; // true     new Number(0) 其实是一个number
