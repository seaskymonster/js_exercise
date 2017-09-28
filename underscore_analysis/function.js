1. _.delay & _.defer

_.delay = function(func, wait){
	var args = slice.call(arguments, 2);
	return setTimeout(function(){
		return func.apply(null, args);
	}, wait)
}


_.defer is make 0ms 

_.defer = _.partial(_.delay, _, 1);



2. _.after & _.before &_.once


   function print() {
   	  console.log('hello world');
   }

   var renderNotes = _.after(3, print);
   renderNotes();
   renderNotes();
   renderNotes();//hello world



   var renderNotes = _.before(3, print);
   renderNotes();//hello world
   renderNotes();//hello world
   renderNotes();
   renderNotes();
   
   var renderNotes = _.once(print);
	// 至多执行一次 print
   renderNotes(); // hello world
   renderNotes();
   renderNotes();