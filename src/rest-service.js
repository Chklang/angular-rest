(function () {
	'use strict';

/**
 * @ngdoc service
 * @name rest.user
 * @description # user Service in the spacesimperiumApp.
 */
angular.module('RestModule').service('restRequest', [ '$http', 'rest', function User($http, rest) {
	//Initialize value of typeof [function]
	var lTypeofFunction = typeof (function () {});
	
	/**
	 * Base request
	 * @param options Options for the request
	 */
	this.base = function(options) {
		//Url to call
		var url = options.url;
		
		//Method to use
		var method = options.method;
		
		//Datas to send
		var data = options.data;
		
		//Content type
		var contentType = options.contentType;
		
		//Callback on success
		var success = options.success;
		
		//Callback on error
		var error = options.error;
		
		//Errors codes
		var errorsCodes = options.errorsCodes;

		//Construct request
		var objRequest = {};
		objRequest.method = method;
		objRequest.url = rest.restPath + url;
		if (data) {
			objRequest.data = data;
		}
		if (contentType !== undefined && contentType !== null && contentType !== "") {
			objRequest.headers = {
					"Content-Type" : contentType
			};
		}
		
		//Execute request
		var result = $http(objRequest);
		
		//Put callbacks
		result.success(function(data, status) {
			success(data);
		});
		result.error(function(data, status) {
			
			//An error was occured
			
			//Boolean to know if we must execute error case or ignore it
			var lMustExecuteErrorCase = true;
			
			//Options to give to callback
			var lOptions = null;
			
			//Key used to iterate on options
			var lKey = null;
			
			
			
			//Initialize options
			
			//Default - any error code
			if (rest.defaultErrorsCodes['default'] && typeof rest.defaultErrorsCodes['default'] != lTypeofFunction) {
				lOptions = lOptions || {};
				for (lKey in rest.defaultErrorsCodes['default']) {
					lOptions[lKey] = rest.defaultErrorsCodes['default'][lKey];
				}
			}
			//Default - specific error code
			if (rest.defaultErrorsCodes[status] && typeof rest.defaultErrorsCodes[status] != lTypeofFunction) {
				lOptions = lOptions || {};
				for (lKey in rest.defaultErrorsCodes[status]) {
					lOptions[lKey] = rest.defaultErrorsCodes[status][lKey];
				}
			}
			//Specific request - any error code
			if (errorsCodes && errorsCodes['default'] && typeof errorsCodes['default'] != lTypeofFunction) {
				lOptions = lOptions || {};
				for (lKey in errorsCodes['default']) {
					lOptions[lKey] = errorsCodes['default'][lKey];
				}
			}
			//Specific request - specific error code
			if (errorsCodes && errorsCodes[status] && typeof errorsCodes[status] != lTypeofFunction) {
				lOptions = lOptions || {};
				for (lKey in errorsCodes[status]) {
					lOptions[lKey] = errorsCodes[status][lKey];
				}
			}
			
			
			
			//Initialize parameters given to callback
			var lParamsToCall = [data];
			if (lOptions !== null) {
				lParamsToCall.push(lOptions);
			}
			

			
			//Execute callbacks
			
			//Specific request - specific error code
			if (lMustExecuteErrorCase && errorsCodes && errorsCodes[status] && typeof errorsCodes[status] == lTypeofFunction) {
				if (errorsCodes[status].apply(window, lParamsToCall) !== true) {
					lMustExecuteErrorCase = false;
				}
			}
			//Specific request - any error code
			if (lMustExecuteErrorCase && errorsCodes && errorsCodes['default'] && typeof errorsCodes['default'] == lTypeofFunction) {
				if (errorsCodes['default'].apply(window, lParamsToCall) !== true) {
					lMustExecuteErrorCase = false;
				}
			}
			//Default - specific error code
			if (lMustExecuteErrorCase && rest.defaultErrorsCodes[status] && typeof rest.defaultErrorsCodes[status] == lTypeofFunction) {
				if (rest.defaultErrorsCodes[status].apply(window, lParamsToCall) !== true) {
					lMustExecuteErrorCase = false;
				}
			}
			//Default - any error code
			if (lMustExecuteErrorCase && rest.defaultErrorsCodes['default'] && typeof rest.defaultErrorsCodes['default'] == lTypeofFunction) {
				if (rest.defaultErrorsCodes['default'].apply(window, lParamsToCall) !== true) {
					lMustExecuteErrorCase = false;
				}
			}
			
			//Generic errors
			if (error) {
				if (lOptions !== null) {
					error(data, status, lOptions);
				} else {
					error(data, status);
				}
			}
		});
		return result;
	};
	
	/**
	 * GET method
	 * @param options Options of the request
	 */
	this.get = function(options) {
		options.method = 'GET';
		return this.base(options);
	};
	
	/**
	 * POST method
	 * @param options Options of the request
	 */
	this.post = function(options) {
		options.method = 'POST';
		return this.base(options);
	};
	
	/**
	 * PUT method
	 * @param options Options of the request
	 */
	this.put = function(options) {
		options.method = 'PUT';
		return this.base(options);
	};
	
	/**
	 * DELETE method
	 * @param options Options of the request
	 */
	this.delete = function(options) {
		options.method = 'DELETE';
		return this.base(options);
	};
} ]);

})();