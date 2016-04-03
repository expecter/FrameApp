var networkUtil = {
	/**
	 * 拼接 url
	 * @param url
	 * @param params (字符串或字典)
	 * @returns
	 */
	wrapUrl: function (url, params) {
		if (!params) {
			return url;
		}
		
		params = networkUtil.wraperParams(params);
		if (params.length == 0) {
			return url;
		}
		
		if (url.endsWith("?")) {
			return url + params;
		}
		if (url.indexOf("?") < 0) {
			return url + "?" + params;
		}
		return url + "&" + params;
	},
	/**
	 * 拼接参数
	 * @param params
	 * @returns
	 */
	wraperParams: function (params) {
		if (typeof (params) == 'string') {
			return params;
		}

		var paramList = [];
		for (var i in params) {
			paramList.push( encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) );
		}
		return  paramList.join("&");
	},
	/**
	 * http请求
	 * @param args
	 * 		{
	 * 			useJson
	 * 			usePost: 使用post或者get
	 * 			url: 请求url
	 * 			params: 请求参数
	 * 				usePost=false, 该参数会拼接到 url 里面去
	 * 			callbackFunc: 回调函数
	 * 				回调参数 {
	 * 					ok: http状态码是否 200
	 * 					status: http状态码
	 * 					statusText: http状态文本
	 * 					responseText: 返回文本
	 * 					xhr: XMLHttpRequest 对象
	 * 				}
	 * 			async: 是否异步执行
	 * 		}
	 */
	http:function(args){
		var useJson = args.useJson == undefined ? true : args.useJson;
		var usePost = args.usePost == undefined ? true : args.usePost;
		var url = args.url;
		var params = networkUtil.wraperParams(args.params || "");
		var callbackFunc = args.callbackFunc == undefined ? function(){} :args.callbackFunc;
		var async = args.async == undefined ? true : args.async; // false，请求是同步的，后续对 send() 的调用将阻塞
		if (!usePost) {
			url = networkUtil.wrapUrl(url, params);
		}
		
//		$.ajax({
//
//		     type: 'POST',
//		
//		     url: url ,
//		
//		    data: params ,
//		
//		    success: function(data){
//		    	console.log("#### HTTP: response=" + data);
//		    } ,
//		
//		    dataType: 'json',
//		
//		});

		var xhr = new window.XMLHttpRequest();
		xhr.open(usePost ? "POST" : "GET", url, async);
		//xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {

				var response = xhr.responseText;
				console.log("#### HTTP: url= " + url + ", params=" + params + ", useJson=" + useJson + ", response=" + response);
				if (useJson) {
					response = JSON.parse(response);
				}

				callbackFunc({
					ok: xhr.status == 200,
					status: xhr.status,
					statusText: xhr.statusText,
					response: response,
					xhr : xhr
				})
			}
		};
		if (usePost) {
			xhr.send(params);
		}
		else {
			xhr.send();
		}
	},
	/**
	 * http get 请求 (回调返回 text)
	 * @param args
	 */
	httpGetText: function (args) {
		args.useJson = false;
		args.usePost = false;
		networkUtil.http(args);
	},
	
	/**
	 * http post 请求 (回调返回 text)
	 * @param args
	 */
	httpPostText: function (args) {
		args.useJson = false;
		args.usePost = true;
		networkUtil.http(args);
	},
	
	/**
	 * http get 请求 (回调返回 json)
	 * @param args
	 */
	httpGetJson: function (args) {
		args.useJson = true;
		args.usePost = false;
		networkUtil.http(args);
	},

	/**
	 * http post 请求 (回调返回 json)
	 * @param args
	 */
	httpPostJson: function (args) {
		args.useJson = true;
		args.usePost = true;
		networkUtil.http(args);
	},
}