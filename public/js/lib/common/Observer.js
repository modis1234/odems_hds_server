define([
    "sockjs",
    "rx"
],function(
    SockJS,
    Rx
){
	function Observer(url, sendData, callback) {
		this.ws = new SockJS(url);
		this.data = sendData;
		this.subject = {};
		this.subscription = {};
		this.subject.main = new Rx.Subject();
		
		this.subscription.main = this.subject.main.subscribe( 
			function(x){ 
				callback
			}, 
			function(e) {
				console.log('error: ' + e.message)
			}, 
			function() {
				console.log('completed')
			}
	 	);
	
		this.init();
	}
	
	Observer.prototype = {
		init : function(){
			var _this = this;
			var timeout;
			this.ws.onopen = function () {
				var that = _this;
				console.log('Info: WebSocket connection opened.');
				
				timeout = setTimeout(function() {
					that.ws.send(JSON.stringify(that.data));
					clearTimeout(timeout);
				}, 2000);
				
		    };
		    this.ws.onmessage = function (event) {
		    	var that = _this;
		        
		    	_this.publish(event.data);
		        
		        that.data.seqNo = JSON.parse(event.data).seqNo;
		        /*
		        timeout = setTimeout(function() {
		        	that.ws.send(JSON.stringify(that.data));
					clearTimeout(timeout);
				}, 20000);
		        */
		    };
		    this.ws.onclose = function () {
		        console.log('Info: WebSocket connection closed.');
		    };
		},
		add : function(key, callback, view, error) {
			this.subject[key] = new Rx.Subject();
			this.subscription[key] = this.subject[key].subscribe( 
				function(x) { 
					callback(x, view) //|| console.log('next: ' + x), 
				}, 
				function(e)	{ 
					error(x) || console.log('error: ' + e.message)
				}, 
				function() { 
					console.log('completed')
				}
		 	);
		},
		publish : function(data) {
			var _data = data
			for(var key in this.subject) {
				this.subject[key].next(_data);
			}
		},
		destroy : function(key) {
			this.subscription[key].unsubscribe();
			this.subject[key].unsubscribe()
			delete this.subscription[key];
			delete this.subject[key];
		}
	}
	
	return Observer;
});