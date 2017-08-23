// 看一个event 是否到了一个desire state
// If the event doesn't exist, you need to check for your desired state at intervals


function poll(fn, timeout, interval){
	var endTime = Number(new Date()) + (tiemout || 2000); // the time you throw an error
	interval = interval || 100; // check interval

	var checkCondition = function(resolve, reject){
		var result = fn(); // check the event state
		if(result){  // if ready
			resolve(result); // resolve it
		}else if(Number(new Date()) < endTime){ // if not ready , but not exceed the endTime
			setTimeout(checkCondition, interval, resolve, reject); // call the function itself at interval
		}else{ // if not ready and exceed the endTime, throw an error
			reject(new Error("timed out for " + fn + ": " + arguments));
		}
	}

	return new Promise(checkCondition); // using promise
}


Usage: ensure element is visible


poll(function(){
	return document.getElementById("lightbox").offsetWidth > 0;
}, 2000, 150).then(function(){
	//polling done, now do something else!
}).catch(function(){
	//polling timed out, handle the error
})