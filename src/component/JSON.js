(function(window){
	var json={
		parse: function(str){
			return (new Function('return '+str))();
		},
		stringify: function(data){
			if(typeof data=="object"){
				if(data instanceof Array){
					var strs=[];
					for( var i=0; i<data.length; i++){
						strs.push(arguments.callee(data[i]));
					}
					return '['+strs.join(',')+']';
				}else{
					var strs=[];
					for( var method in data){
						strs.push(arguments.callee(method)+':'+arguments.callee(data[method]));
					}
					
					return '{'+strs.join(',')+'}';
				}
			}else if(typeof data=="string"){
				return '"'+data.replace(/"/g,'\"')+'"';
			}else{
				return data;
			}
		}
	};
	
	if(typeof JSON == "undefined"){
		window.JSON = json ;
	};
})(this);
