作者：何幻
链接：https://www.zhihu.com/question/36972010/answer/71338002
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


promise 和 setTimeout 的执行顺序：

/// 看题：
setTimeout(
	function(){
	   console.log(4)
	},0);

new Promise(
	function(resolve){ 
	   console.log(1)
	   for( var i=0 ; i<10000 ; i++ ){
	      i==9999 && resolve() 
	   }
	   console.log(2) 
    }
).then(
    function(){ 
    	console.log(5) 
    });
console.log(3);
////

执行结果： 1 2 3 5 undefined,4

********************************************
有一个事件循环，但是“任务队列”可以有多个

1. 整个script 代码， 放在了macrotask queue 中
2. setTeimout 也放在 macrotask queue 
3. *** promise.then 放到了另一个“任务队列” microtask 中

执行顺序： 取一个macrotask queue 中的task， 执行之， 然后执行完所有的microtask queue 中的task, 再取macrotask queue 中的下一个任务。

*********************************************

HTML 事件循环：

Event loop:

To coordinate events, user interaction, scripts, rendering , networking and so forth, user agents must use event loops.

An event loop has one or more task queues. A task queue is an ordered list of task.

每一个任务都有一个任务源(task source). 相同的任务源， 只能放在一个任务队列中。 不同任务源的任务，可以放到不同任务队列中。

结论： 可以有多个任务队列，目的想必是方便调整****优先级****。


setImmediate(
	function(){ 
		console.log(1);
    },0); 

setTimeout(
	function(){ 
		console.log(2); 
	},0);

new Promise(
	function(resolve){ 
	    console.log(3); 
	    resolve(); 
	    console.log(4); 
	}).then(
	   function(){
	      console.log(5); 
	}); 
	   
console.log(6); 

process.nextTick(
	function(){ 
		console.log(7); 
});

console.log(8);

执行结果： 3 4 6 8 7 5 2 1

优先级： process.nextTick > promise.then > setTimeout > setImmediate


promise/A+ 规范：
*******************************************************************************************************
macrotask : script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering
microtask : process.nextTick, Promises(这里指浏览器事项的原生Promise)， Object.observe, MutationObserver


*******************************************************************************************************


疑问： 1. process.nextTick 也会放到microtask queue， 为什么优先级比 promise.then 高呢？

     Ans: 在Node 中， _tickCallback 在每一次执行完TaskQueue 中的一个任务后被调用，而这个_tickCallback中实质干了两件事：
     1. nextTickQueue 中所有任务执行掉
     2. 第一步执行完成后执行 _runMicrotasks 函数， 执行microtask中的部分（promise.then 注册的回掉）
     所以明显 process.nextTick > promise.then


     2.到底setTimeout 有没有一个依赖实现的最小延迟？ 4ms？

     Ans： 4ms 已经是标准化了。  