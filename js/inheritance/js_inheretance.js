//https://segmentfault.com/a/1190000010842024

// All constructor function has a prototype propterty, which points the prototype object 

// actually all object has a internal prototype, but you cannot reach it, so some browser such as chrome, let it have a __proto__ property, which points to the prototype object  


1. 

function Person(name) {
	this.name = name;
}

var person = new Person("a");


Person.prototype === person.__proto__;
//他们都是指向的原型对象。


2.

var person1 = new Person("a");
var person2 = new Person("b");

person1.__proto__,  person2.__proto__, Person.prototype  ,这三个两两相等。

3. constructor

原型对象有一个 constructor property, points to 原型对象的构造函数

Person.prototype.constructor === Person
person.__proto__.constructor === Person

4. instance does not have constructor property, but it can inherate it form prototype's constructor。

person1.constructor === Person
person2.constructor === Person





// 坑
1.

function Person(name) {
	this.name = name;
}

Person.prototype.ageList = [12, 16, 18];

var person1 = new Person("a");
var person2 = new Person("b");

person1.ageList.push(30);

person2.ageList // [12, 16, 18, 30];


if we change person1.ageList.push(30)  to person1.ageList = [1,2,3];

person2.ageList //[12, 16, 18]

why? In that case, we give person1 a property called ageList, since it has ageList, it doesn't need to find it in prototype.


2.

funciton Person(name) {
	this.name = name;
}

Person.prototype = {
	ageList: [12, 16, 18]
}

var person1 = new Person("a");
var person2 = new Person("b");

person1.ageList.push(30);

person2.ageList // [12, 16, 18, 30];



at this time : person1.constructor === Person // false
               person2.constructor === Person // false

why ? 因为通过给Person.prototype 付一个对象， 就修改了原型对象的point， 此时原型对象constructor points to 内置构造函数 object

so , when 给原型对象赋值一个Object 时候，记得将原型对象的constructor 只想原来的构造函数

like this: Person.prototype.constructor = Person