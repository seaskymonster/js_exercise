


function decounce(func, wait, immediate){
	var timeout;
	
	return function(){
		var args = arguments; 
	    var context = this;

		if(timeout) clearTimeout(timeout);
		if(immdiate){
			var callNow = !timeout;
            timeout = setTimeout(function(){
            	timeout = null;
            }, wait);

            if(callNow){
            	func.apply(context, args);
            }
		}else{
			timeout = setTimeout(function(){
                func.apply(context, args);
			}, wait)
		}
	}
}



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





function debounce(func, wait, immediate){
	var timeout, result;
	var debounced = function(){
		var context = this;
		var args = arguments;

		if(timeout) clearTimeout(timeout);

		if(immediate){
			var callNow = !timeout;
			timeout = setTimeout(function(){
               timeout = null;
			}, wait)

			if(callNow) result = func.apply(context, args);
		}else{
			timeout = setTimeout(function(){
               func.apply(context, args);
			},wait)
		}

		return result;
	}

	debounced.cancel = function(){
		clearTimeout(timeout);
		timeout = null;
	}

	return debounced;
}