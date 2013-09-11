// jquery.lock.js by syunya kuramoto - http://senpu-ki.com
// Dual licensed under the MIT and GPL

(function($){
	$.fn.feedForm = function(options){
		var op = $.extend(this,{
			obj  : "{}",
			display : "",
			click : "",
			submit : "",
			focus : "",
			blur : "",
			change : "",
			keydown : "",	
		},options);
		
		function objToForm(t){
			var st = "";
			var endTag = "";
			for(var i in t){
				var tag = t[i].tag;
				var type = t[i].type ? t[i].type : "";
				var set = t[i].set ? t[i].set : "";
				var len = 1;
				var name = t[i].name ? t[i].name : "";
				var value = t[i].value ? t[i].value : "";
				if(tag == "input" || tag == "select" || tag == "textare"){
					len = t[i].value.length;
				}
				var str = t[i].str;
				var textSetFront = t[i].textSetFront;
				var label = t[i].label ? t[i].label : "";
				var e = document.createElement(tag);
				if(set){
					for(var l in set){
						e.setAttribute(l,set[l]);
					}					
				}			
				var l = document.createElement("label");
				if(tag == "select"){
					e.setAttribute("name",name);
					var c = document.createElement("option");
					c.setAttribute("name",name);
					for(var h = 0; h < len; h++){
						var y = c.cloneNode(false);
						y.setAttribute("value",value[h]);
						y.appendChild(document.createTextNode(str[h]));
						e.appendChild(y);
					}
					st += e.outerHTML;
				}else{
					for(var h = 0; h < len; h++){
						var y = e.cloneNode(true);
						if(value){y.setAttribute("value",value[h])}
						if(name){y.setAttribute("name",name)}
						if(tag == "input"){y.setAttribute("type",type)}
						var r;
						if(tag != "input" && tag != "select" && tag != "textare"){
							y.appendChild(document.createTextNode(str[h]));
							r = y.outerHTML;
						}else{
							r = y.outerHTML;
							if(str[h]){
								if(textSetFront){
									r = str[h] + r;
								}else{
									r = r + str[h];
								}
							}
						}
						if(label){
							st += "<label>" + r + "</label>";
						}else{
							st += r;
						}
					}
				}			
			}
			return st;
		}
		function getFormParam(){
			
		}
		return this.each(function(e){
			var form = $(this).append(objToForm(op.obj)).find('input,textarea,option');
			if($.isFunction(op.display)){op.display(e)}
			form.bind({
				
				click  : function(e){
								if(e.target.getAttribute("type") == "submit"){
									var t = form.length;
									var ol = "";
									var olN = "";
									var ob = {};
									for(var i = 0; i < t; i++){
										var r = form[i];
										var tag = r.tagName;
										var type = r.getAttribute("type");
										var name = r.getAttribute("name");
										if(type == "checkbox"){
											if(ol != type || olN != name){ob[name] = new Array();}
											if(r.checked){
												ob[name][ob[name].length] =  r.value;
											}
										}else if(type == "radio"){
											if(ol != type || olN != name){ob[name] = ""}
											if(r.checked){
												ob[name] =  r.value;
											}											
										}else if(type == "submit"){
											ob["submit"] = true;
											
										}else if(type == "option"){
											if(r.selected){
												ob[name] = r.value;
											}
										}else{
											ob[name] =  r.value;
										}
										ol = type;
										olN = name;
									}
									if($.isFunction(op.submit))op.submit(ob);
								}else{
									if($.isFunction(op.click))op.click(e);
								}		
							},
				focus : function(e){
								if($.isFunction(op.focus))op.focus(e);	
							},
				blur	:  function(e){
								if($.isFunction(op.blur))op.blur(e);	
							},
				change	:  function(e){
								if($.isFunction(op.change))op.change(e);	
							},
				keydown :  function(e){
								if($.isFunction(op.keydown))op.keydown(e);	
							}
			});
		});
	};
})(jQuery);