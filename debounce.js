// 适用于 input droplown list
// 适用于 resize
// call the func unitl the user stop doing sth,
// if the use continously call this func, don't call it.

//simple version

function debounce(func, wait){
	var timeout; 

	return function(){
		var self = this;
		var args = arguments;

		var callLater = function(){
			 timeout = null;
             func.apply(self, args);
		}

		clearTimeout(timeout);
        timeout = setTimeout(callLater, wait);
	}
}




//When immediate is passed in, call the func immediately.
//If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

// complicated version.

function debounce(func, wait, immediate){
	var timeout;
	return function(){
		var self = this;
		var args = araguments;

		var callLater = function(){
			timeout = null;
			if(!immediate) func.apply(self, args); // when immediate is passed in, don't call this func, because it has been trigged in 49
		}

		var callNow = immediate && !timeout; // callNow means immeidate but don't have timeout.
		clearTimeout(timeout);
		timeout = setTimeout(callLater, wait);

		if(callNow) func.apply(self, args);
	}
}