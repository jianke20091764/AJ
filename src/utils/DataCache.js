AJ.namespace('Util.DataCache',(function(){
	var staticApi = AJ.Util.Config.getConfig('AppStaticApi') ;
    var dataCache = {};     
    var engine = {
        callbacks : {},
        load : function(){
            this.getStaticData();
        },
        
        getStaticData : function(){
            var i ,len ;
            for(i = 0 ,len = staticApi.length ; i < len ; i ++){
                this.getAjax(staticApi[i]);
            }
        },
        
        getDynamicData : function(api,callback,isClearCache){
            var key = tools.formatKey(api.url,api.data);            
            if(isClearCache){
                tools.removeItem(key);
            }
             
            if(!tools.getItem(key)){               
                this.setCallback(key,callback);   
                this.getAjax(api,callback);
            }else{
                this.getData(key,callback);    
            }
        },
        
        getAjax : function(api){
            var key = tools.formatKey(api.url,api.data);
            tools.setItem(key,'loading');
            AJ.ajax(AJ.extend({},api,{
                success : AJ.proxy(function(data){
                    if(data){
                        tools.setItem(key,data);
                    }else{
                        tools.setItem(key,false);
                    }
                    
                    this.returnCallback(key);                        
                },this),
                
                error : AJ.proxy(function(){
                    tools.setItem(key,false);
                    this.returnCallback(key);        
                },this)
            }));
        },
        
        returnCallback : function(key){
            var data = tools.getItem(key);
            
            if(this.callbacks[key]){
            	AJ.each(this.callbacks[key],function(k,v){
                    try{
                        v(data);
                    }catch(e){
                    	
                    }
                });                
                
                delete this.callbacks[key];
            }                        
        },
        
        getData : function(key,callback){
            var data = tools.getItem(key) ;
            
            if(data && data != 'loading'){
                callback(data);
                return true;
            }else if(data === false){
                callback(false);
                return false;
            }
            
            this.setCallback(key,callback);     
        },
        
        setCallback : function(key,callback){
            if(!this.callbacks[key]){
                this.callbacks[key]=[];
            }
            
            if(typeof callback=='function'){
                this.callbacks[key].push(callback);
            }   
        }
    };
    
    engine.load();
    
    var tools = {
        formatKey : function(url,data){
            var key = [];
            if(!url && !data){
                throw Error('please check your arguments !');
            }
            
            if(url && typeof url == 'string'){
                key.push('url=' + url) ;
            }
            
            if(url && typeof url == 'object' && !data){
                data = url ;
                url = false ;
            }
            
            if(data && typeof data == 'object'){
                var item = [] ;
                for(var pro in data){
                    item.push(pro,data[pro]);
                }
                
                key.push('data=' + item.join('/'));
            }
            
            return key.join(';');
        },
        
        setItem : function(key,obj){
            dataCache[key] = obj || {} ;
        },
        
        removeItem : function(key){
            if(typeof dataCache[key] != 'undefined'){
                delete dataCache[key] ;
            }
        },
        
        getItem : function(key){
            return dataCache[key] || false ;
        },
        
        asyncItem : function(key,callback,isClearCache){
            if(typeof key == 'string'){
                return engine.getData(key,callback,isClearCache) ;     
            }else if(typeof key == 'object'){
                return engine.getDynamicData(key,callback,isClearCache);
            }
            
            return false ;                                                      
        },
        
        getCallback : function(key){
            return engine.callbacks[key] || [] ;
        }
    };

    return tools ;
})());