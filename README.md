# Manifest
angular-rest is a bower component to help you on a REST application. It use global configuration to add easily new resources.
It use $http.

#How to use it
Install it with
```
bower install angular-rest --save
```

Add it into your main script :
```JavaScript
angular
  .module('myApplication', [..., 'RestModule'])
  .config(['restProvider', function (restProvider) {
    //Configuration of REST global path
    restProvider.restPath('/rest');
  });
```

And create your service :
```JavaScript
angular
  .module('myApplication')
  .service('User', [ 'restRequest', function User(restRequest) {
    this.create = function(pLogin, pPassword, pEmail, pSuccessCallback) {
      return restRequest.post({
        url : '/users/create',
				data : {
					pseudo : pLogin,
					password : pPassword,
					mail : pEmail
				},
				success : pSuccessCallback,
				errorsCodes : {
					'400' : function(pData) {
						alert("Parameters error : " + pData);
					},
					'409' : function() {
						alert("Login " + pLogin + " is already used.");
					},
					'default' : function(pData) {
						alert("Impossible to create user. Unknow error : " + pData);
					}
				}
      });
    };
  });
```

This service will expose "create" method, and this method will do a request to /rest/users/create because into main script we have configured main rest path to "/rest"

#Configuration
Set REST global path
```JavaScript
restProvider.restPath(/* Global path */);
```

Set default error codes
```JavaScript
restProvider.defaultErrorsCodes({
  "400" : function(pData) {
		alert("Parameters error : " + pData);
	} 
});
```
By default its :
```JavaScript
{
	'default' : function(pData) {
		alert('Internal server error : ' + pData);
	}
};
```

#Methods
```JavaScript
restRequest.get
```
Do a GET request

```JavaScript
restRequest.post
```
Do a POST request

```JavaScript
restRequest.PUT
```
Do a PUT request

```JavaScript
restRequest.delete
```
Do a DELETE request

```JavaScript
restRequest.base
```
Do a generic request (not fix method parameter)

#Parameters
* url : Url of request. This URL is prefixed with global path fixed into configuration.
* method : Method of request (GET, POST, PUT, DELETE, OPTION, ...).
* data : Datas to send. Can be any type but $http fix JSON by default.
* contentType : Type of "data". Added to headers with key "Content-Type : {}".
* success : Callback if success
* error : Callback if error
* errorsCodes : Fix easily action by error codes. Called in all cases, if "error" parameter is setted or not.
