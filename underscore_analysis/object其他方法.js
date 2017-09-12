1. _.pick   

    // 从一个ojbect 里面 pick 出来你想要的 key-value值
    _.pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age');
	=> {name: 'moe', age: 50}

	_.pick({name: 'moe', age: 50, userid: 'moe1'}, ['name', 'age']);
	=> {name: 'moe', age: 50}

	_.pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
	  return _.isNumber(value);
	});
	=> {age: 50}


	_.pick = function(object, oiteratee, context){
		var result = {}, obj = object, iteratee, keys;

		if(obj == null) return result;

		if(!_.isFunction(oiteratee)){
			keys = _.allKeys(obj);
			iteratee = optimizeCb(oiteratee, context);
		}else{
			//如果第二个参数不是函数
			// 则后边的keys可能是数组，也可能是几个并列的参数，用flatten把他们展开。

			keys = flatten(arguments, false, false, 1);

			iteratee = function(value, key, obj){
				return key in obj;
			};

			obj = Object(obj);
		}

		for(var i = 0; length = keys.length; i < length; i++){
			var key = keys[i];
			var value = obj[key];
			if(iteratee(value, key, obj)) result[key] = value;
		}

		return result;
	} 



2. _.create 方法非常简单，根据你给的原型（prototype），以及一些own properties，构造新的返回对象。

	var Person = function(){};

	Person.prototype = {
		show： function(){
			alert(this.name);
		}
	};

	var me = _.create(Person.prototype, {name: "hanzichi"});

	console.log(me);

	//Object {name : "hanzichi"}
	// name : "hanzichi"
	// _proto_: Object
    // show: function()

    其实在es5里面，我们可以用Object.create();

    var me =Object.create(Person.prototype);
    _.extendOwn(me, {name:'hanzichi'});


    如果不支持es5，我们可以创建一个构造函数。

    var _Person = function(){

    };

    _Person.prototype = Person.prototype;

    var me = new _Person();

    _.extendOwn(me, {name : 'hanzichi'});

    其实 underscore 也是这样实现的。

    _.create = function(prototype, props){
    	var result = baseCreate(prototype);
    	if(props) _.extendOwn(result, props);
    	return result;
    }


    var baseCreate = function(prototype){
    	if(!_.isObject(prototype)) return {};
    	if(nativeCreate) return nativeCreate(prototype);
    	Ctor.prototype = prototype;
    	var result = new Ctor;
    	Ctor.prototype = null;
    	return result;
    }


    var Ctor = function(){}; // naked function reference for surrogate-prototype-swapping.


    


