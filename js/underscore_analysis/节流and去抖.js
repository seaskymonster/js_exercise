节流：让一个函数执行的不要的太频繁，减少一些过快的调用来节流。

去抖：函数去抖就是对于一定时间段连续的函数调用，只让其执行一次。


throttle 应用场景：

1. DOM 元素的拖拽实现。
2.射击游戏的mousedwon/keydown（单位时间只发射一颗子弹）
3.计算鼠标移动的距离
4.Canvas模拟版画功能
5.搜索联想（keyup）
6.监听滚动时间判断是否到页面底部自动加载过多。给scroll加了debounce后，只有用户停止滚动，才会判断是否到了页面底部。 如果throttle，只要页面滚动就会间隔一段时间判断一次。


debounce 应用场景：

1. 每次resize/scroll 出发统计时间
2.文本输入的验证：（连续输入文字后发送AJAX请求进行验证，验证一次就好）。

......................................................................

1. 去抖。 

window.onscroll = function(){
	console.log('hello world');
};


underscore 中实现方法：  // 

_.debounce = function(func, wait, immediate){
	var timeout, args, context, timestamp, result;

	var later = function(){
		var last = _.now() - timestamp;
		if(last < wait && last >= 0){
			timeout = setTimeout(later, wait-last);
		}else{
			timeout = null;// 这里必须要清楚tiemout，这个意思就是在timeout 这段时间没有人call 这个函数
			if(!immediate){ // immdeiate 不用call ，因为immediate 为true的时候，已经call 了。
				result = func.apply(context, args);
				if(!tiemout){
					context = args = null;
				}
			}
		}
	};

	return function(){
		context = this;
		args = arguments;

		timestamp = _.now();

		var callNow = immediate && !timeout; // immediate, 立刻执行，可以，我这时候有timeout了，那么你再call这个函数， 就不执行了。

		if(!timeout){ //这个地方不明白， 你不clearTimeout， 而且只有在timeout = null的时候重置timeout.
			timeout = setTimeout(later, wait); 
		}

		if(callNow) {
			result = func.apply(context, args);
			context = args = null;
		}

		return result;
	}
}