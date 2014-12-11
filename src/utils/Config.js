AJ.namespace('Util.Config',(function(){
	var config = {
        'AppStaticApi' : [{
        	url : '/',
        	dataType : 'json',
        	data : {}
        }]			
	} ;
	var app = {
		setConfig : function(key,obj){
			if(typeof key == 'undefined'){
				thorw Error('Key is undefined !');
			}
			
			config[key] = obj || {} ;
		},
		
		getConfig : function(key){
			return config[key] || {} ;
		}
	};
	
	return app ;
})());