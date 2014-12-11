/**
 * @name AJ LIBRARY
 * @author jianke
 * @email 2100wxz@163.com
 */
(function(window){
	var doc = window.document, loc = window.location, nav = window.navigator;
	var AJ = {
		version : '0.0.1',
		author : 'jianke',
		errorStack : [],
		
		isTouch : (/(ipad|iphone|ios|android)/i.test(window.navigator.userAgent)) ,
		namespace : function(path, args) {
			global = this;
			var ns = function(name) {
				var part = global, parts = name && name.split('.') || [];

				AJ.each(parts, function(partName) {
					if (partName) {
						part = part[partName] || (part[partName] = {});
					}
				});

				return part;
			};

			var lastIndex = path && path.lastIndexOf('.') || -1;

			return ns(lastIndex === -1 ? null : path.substr(0, lastIndex))[path.substr(lastIndex + 1)] = args;

		},
		
		extend : function() {
			var parent = arguments[0] , len = arguments.length ,i = 1;
			
			if(!parent){
				throw Error('arguments is not null !');
			}
			
			if(len === 0){
				return parent ;
			}
			
			for( ; i < len ; i ++){
				AJ.each( arguments[i] ,function(k,v){
					if(typeof v === 'object'){
						parent[k] = AJ.extend(parent[k] || {} ,v);
					}else{
						parent[k] = v ; 
					}
				});
			}
			
			return parent ;
		},

		each : function(object, callback, args) {
			var name, i = 0, length = object.length, isObj = length === undefined
					|| (typeof object === 'function');

			if (args) {
				if (isObj) {
					for (name in object) {
						if (callback.apply(object[name], args) === false) {
							break;
						}
					}
				} else {
					for (; i < length;) {
						if (callback.apply(object[i++], args) === false) {
							break;
						}
					}
				}
			} else {
				if (isObj) {
					for (name in object) {
						if (callback.call(object[name], name, object[name]) === false) {
							break;
						}
					}
				} else {
					for (; i < length;) {
						if (callback.call(object[i], i, object[i++]) === false) {
							break;
						}
					}
				}
			}

			return object;
		},

		$id : function(str) {
			if (typeof this.trim(str) === 'string') {
				return doc.getElementById(str) || false;
			}

			return false;
		},

		trim : function(str) {
			return str == null ? '' : str.toString().replace(/^\s+/, '')
					.replace(/\s+$/, '');
		},

		bindReady : function(handler) {
			if (document.readystate === 'complete') {
				return setTimeout(handler, 1);
			}

			if (window.addEventListener) {
				window.addEventListener('load', handler);
			} else {
				window.attachEvent('onload', handler);
			}
		},
		
		events : {
			add : function(elem, type, handler) {
				if (elem.nodeType === 3 || elem.nodeType === 8 || !type
						|| !handler) {
					return;
				}

				if (elem.addEventListener) {
					elem.addEventListener(type, handler);
				} else {
					elem.attachEvent('on' + type, handler);
				}
			},

			remove : function(elem, type, handler) {
				if (elem.nodeType === 3 || elem.nodeType === 8 || !type
						|| !handler) {
					return;
				}
				if (elem.removeEventListener) {
					elem.removeEventListener(type, handler);
				} else {
					elem.detachEvent('on' + type, handler);
				}
			}
		},
		
		ajax : function(){
			
		},
		
		proxy : function(){
			
		}
	};
	
	window.$ = window.AJ = AJ ;
})(this);