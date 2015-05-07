/**
 * @ngdoc overview
 * @name spacesimperiumApp
 * @description # spacesimperiumApp
 * 
 * Main module of the application.
 */
(function() {
	'use strict';

	var module = angular.module('RestModule', []);

	module.provider('rest', function rest() {
		
		//Default values
		var restPath = '';
		var defaultErrorsCodes = {
			'default' : function(pData) {
				alert('Internal server error : ' + pData);
			}
		};

		//Modify root rest path
		this.restPath = function(pValue) {
			restPath = pValue;
		};
		
		//Specify default behavior on errors
		this.setDefaultErrorCode = function(pCode, pFunction) {
			defaultErrorsCodes[pCode] = pFunction;
		};
		
		//Constructor
		this.$get = [ function() {
			return {
				restPath : restPath,
				defaultErrorsCodes : defaultErrorsCodes
			};
		} ];
	});

})();