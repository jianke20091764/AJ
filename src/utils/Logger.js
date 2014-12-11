AJ.namespace('Util.Logger',(function(){
	var development = false ;
    var devUser = 'jianke' ;
    var config = {
        url : 'http://127.0.0.1:3000/putTouchLogger'
    };
    
    var paserUrl = function(){
        var href = window.location.href ;
        if(!/^http.+/gi.test(href)){
            development = true ;
            return ;
        }
        
        var search = window.location.search ;
        if(/\?.+/gi.test(search)){
            search = search.slice(1);
            var params = search.split('&'),i,len;
            for( i=0 ,len = params.length ; i < len ; i++){
                if(/^development.+/gi.test(params[i])){
                    var key = params[i].split('=');
                    if(key[0] == 'development' && (key[1] == '1' || key[1] == 'true')){
                        development = true ;                        
                    }
                }
                
                if(/^user.+/gi.test(params[i])){
                    devUser = params[i].split('=')[1] ;
                }
            }
        }
    };        
    paserUrl();
    
    var Logger = function(){
        if(development){
            (new Image()).src = config.url + '?user=' + devUser + '&data=' + JSON.stringify(arguments);
        }
    };
    
    window.logger = Logger ;
    
    if(typeof console == 'undefined'){
    	console={};
    	window.console = console ;    	
    };

    if(typeof console.log == 'undefined'){
    	console.stack=[];
    	console.log=function(){
    		console.stack.push(arguments);
    	};
    };
    
	return Logger ;
})());