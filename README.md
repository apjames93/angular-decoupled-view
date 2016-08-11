SETTING UP ANGULAR

(1.2) make file structure
	(1.3)make folder components
		(1.4) under the components folder make folder list
			-make files
				list.js
				list-service.js
				list-item-directive.js

		(1.5) under the components folder make folder login
			-make files
				login.js
				login-service.js
				login-item-directive.js

(1.6) under the components folder make folder signup
	-make files
		signup.js
    	  	signup-service.js
    		signup-item-directive.js

	(1.7)make folder controllers under root folder
		-make file
			list-controller.js

	(1.8)make folder css under root folder
		-make file
			style.css

	(1.9) make folder js under root folder
		-make file
			app.js

	(1.10) make folder templates
		-make file
			home.html
			list-item.html
			list.html
			login.html
			signup.html
	(1.11) make file in root
		index.html

INDEX.HTML SETUP

SCRIPT TAGS
(1)
Add in the script tag for angular cdn we are using angularjs 1.5
	Ex
		  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>

(2)
we will be using ui router for this app so below the angular cdn add in the cdn for angular-ui-router
Ex
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.8/angular-ui-router.min.js"></script>

(3)
add in the script tag for app.js. This is our javascript file
Ex
    <script type="text/javascript" src="/js/app.js"></script>
//maybe a  note here about how the script order matters because of loading times

(4)
we are going to name the app in the html tag so angular has a name for the project add in ng-angular=”angular-app-name”
Ex
	<html ng-app="todo-angular">
(5)
now under the body tag in index.html add a <div ui-view></div>
Ex
	<div ui-view></div>
//maybe explain what this div is doing, exactly









APP.JS SETUP PART ONE:
The app.js file will be used to make different states with ui-router for the angular app. For more info https://scotch.io/tutorials/angular-routing-using-ui-router

(1)Make an Immediately invoked function(iffe)   we do this to invoke the function anytime the file is accessed
	Ex
		(function(){
			//code will go here
})();
(2)
 inside the iffe* set up the angular module.  module are container for the different parts of your app  controllers, services, filters, directives, etc. For now inject the name of our app and the ui.router. Whenever you inject into a module inject them as a string.
Ex
	angular
 	 .module('todo-angular', [
   	 'ui.router'
])
//maybe remind the reader what the fuck an iffe is (me)

(3)
 setup angularjs configuration or the angular providers that the app will use to make the state. We will use $stateProvider, $urlRouterProvider and $locationProvider.
Ex:
	.config(function($stateProvider, $urlRouterProvider, $locationProvider){
		//code will go here
	}):
(4)
we are going to make a default page using $urlRouterProvider and the otherwise(); function. This will do a redirect to the index page when go to the app.
Ex
	  $urlRouterProvider.otherwise('/');

(5)
Using the $stateProvider we will build the state for our home page. We need a few things to do this. A state() function to invoke the state. The url that will display and the templates that we will use. Set this up in a object format. We will give this a home state, a url of / and a templateUrl of /templates/home.html.
Ex
	    $stateProvider
      		.state('home', {
     		 url: '/',
     		   templateUrl: '/templates/home.html'
  	    })


SETTING UP LOGIN SERVICE
(1)
First thing we are going to do is make a new module for the login by injecting our service and directive we will be making. We do this so we can inject just the signup.js into our angular app and that will be able to use the service and directive we will make
Ex
	"use strict";

angular
 		 .module('todo-angular.login',[
  'todo-angular.login.login-directive',
  'todo-angular.login.login-service'
]);


(2)
login-service.js will be used to make our api calls to out auth/login route for authorization. Go into the file and make an Immediately invoked function(iffe) . //ah, here we are
	Ex
		(function(){
			//code will go here
})();
(3)
next set up the module for this service remember to pass them through as a string. Start with the name of the angular app the file that the service is in and the name of the service. This is attaching the service to your angular app. Add in an empty array to the end of the module.
Ex
	  angular
    		.module('todo-angular.login.login-service', [])
(4)
Now we will create the service. Invoke the .service() function and pass the name of the service as a string then pass the string through as a parameter. We pass through a string  first so angular will not change the parameters for services when the files are minified.
Ex
	.service('loginService', loginService);
(5)
Now that we have a loginService let's inject some angular services into it with $inject . Inject ‘$http’, and ‘$location’ as a string into the loginService.
https://docs.angularjs.org/api/ng/service/$http
https://docs.angularjs.org/api/ng/service/$location
Ex
	    loginService.$inject = ['$http', '$location'];



(6)
Next we will set up what the loginService does. Pass in the $http and $location as parameters.
Ex
	function loginService($http, $location){
		//code will go here
	}

(7)
Make a var user ={} so we can assign the data we get back from our api calls to a user object.
Ex
	Var user = {};
(8)
Now we will set up what the loginService will return when it is used elsewhere. We will make 3 function for the loginService to return loginUser, getToken, getUserId.
Ex
      return {
        getToken: getToken,
        getUserId : getUserId,
        loginUser: loginUser
      };

(9)
Make a _setUserData function that will take the date we get back from the api and store it to our user var we make;
Ex
	      function _setUserData(data) {
        		user = data;
      	      }

(10)
Make the getToken function this will return the user token that JWT our api is sending.
Ex
 	function getToken() {
		return user.token:
	}
(11)
Make the getUserId function this will return the userId that our api is sending.
Ex
 	function getUserId() {
		return user.userId:
	}
(12)
Make the loginUser function. this function will post to our api with the userName and password.
Ex
	      function loginUser(userName, password) {
		//code will go here
	     }
(13)
Use the $http service we injected. And make the api api call
Ex
$http({
method: 'post',
          		params: {
            		userName: userName,
            		password: password
         		 },
         		 url: 'http://localhost:3000/auth/login'
}).then(function successCallback(response) {
           			console.log('win', response);
        		  	_setUserData(response.data);
         		   	$location.path('/list');
       	   	}, function errorCallback(err) {
          			console.log(err);
          });

SETTING UP LOGIN DIRECTIVE  

(1)
login-service.js will be used to make our api calls to out auth/login route for authorization. Go into the file and make an Immediately invoked function(iffe) .
	Ex
		(function(){
			//code will go here
})();
(2)
next set up the module for this service remember to pass them through as a string and to add in an empty array to the end of the module.
Ex
angular
.module('todo-angular.login.login-directive', [])

(3)
We will be making a custom directive for our login.html  use .directive()
Ex
	    .directive('login', login);

(4)
Make the login directive
Ex
function login(){
var directive = {
// restrict: "E " is restricting it to a html element
restrict: 'E',
templateUrl: 'templates/login.html',
// set up the controller. controllerAs: is assigning a name to the controller for when the file is minified
scope: {},
 // scope:{} is making isolate scope so we don't have scope leak
 controller: loginController,
 			 controllerAs: 'loginController'
 };
return directive;
}
(5)
We are going to make a loginController that we will inject the loginServices into . This will bind the directive to the loginServices so we have access to the functions and data it will return from api calls.
Ex
	  loginController.$inject = ['loginService'];
(6)
Make the loginController function and pass in the loginService
Ex
 function loginController(loginService) {
//making a function to get the userName and password from a form submit from login.html
    		this.submit = function(userName, password) {
loginService.loginUser(userName, password);
};
  	}
(7)
Go into templates/home.html and add in our directive with html tags
Ex
	<login></login>




SETTING UP LOGIN TEMPLATE
To bind angular to this we are going to use a ng-submit and ng-model   
https://docs.angularjs.org/api/ng/directive/ngModel
https://docs.angularjs.org/api/ng/directive/ngSubmit

(1)
Make a form with two inputs one for userName and one for password
ex
  <form ng-submit='loginController.submit(userName, password)'>
<!-- use the ng-model for when the form is submitted to update the correct column names in your database tables  -->
      <input placeholder="User Name" ng-model='userName' type="text" class="validate">
<!-- use the ng-model for when the form is submitted to update the correct column names in your database tables  -->
      <input placeholder="Password" ng-model='password' type="password" class="validate">
  <button>Log in
  </button>
</form>

(2)
 go into your index.html and make the script for your login.js  login-service and login-directive.
    <script type="text/javascript" src="/components/login/login.js"></script>
    <script type="text/javascript" src="/components/login/login-directive.js"></script>
    <script type="text/javascript" src="/components/login/login-service.js"></script>

(3)
 go into js/app.js and inject the login.js module to our app
Ex
	  angular
  		.module('todo-angular', [
    		'ui.router',
  		'todo-angular.login’
  	  ])




SETTING UP SIGNUP SERVICE
(1)
First thing we are going to do is make a new module for the login by injecting our service and directive we will be making. We do this so we can inject just the signup.js into our angular app and that will be able to use the service and directive we will make
Ex
	"use strict";

angular
 		 .module('todo-angular.signup,[
  'todo-angular.login.signup-directive',
  'todo-angular.login.signup-service'
]);


(2)
signup-service.js will be used to make our api calls to out auth/signup route for authorization. Go into the file and make an Immediately invoked function(iffe) .
	Ex
		(function(){
			//code will go here
})();
(3)
Make the module for the signup-services remember to pass this through as a string and start with the name of the angular app follows by the folder the services in in and then the name of the services then an empty array.
Ex
	  angular
		.module('todo-angular.signup.signup-service', [])
(4)
Now we will create the service. Invoke the .service() function and pass the name of the service as a string then pass the string through as a parameter. We pass through a string  first so angular will not change the parameters for services when the files are minified.
Ex
	.service('signupService', signupService);
(5)
Now that we have made a signupService let's inject some angular services into it with $inject . Inject ‘$http’, and the loginServices that we made as a string into the loginService. We will use the loginServices so when we have a successful sign up we will log a new person in at the same time
https://docs.angularjs.org/api/ng/service/$http

Ex
	    loginService.$inject = ['$http', 'loginService];
(6)
Let's make what the signupService will return when it is called. We will have it return the createUser function that we will make next.
Ex
	  function signupService($http, loginService){
  		  return {
    		  createUser: createUser
    	};
(7)
Making the createUser function createUser() will take two parameters a userName and password that we will post to our auth/signup route.
Ex
    function createUser(userName, password) {
      console.log('hello', userName, password);
      $http({
        method: 'post',
        params: {
          userName: userName,
          password: password
        },
        url: 'http://localhost:3000/auth/signup'
      })
.then(function successCallback(response) {
          console.log('win', response);
          loginService.loginUser(userName, password);
        }, function errorCallback(response) {
          console.log('loose');
        });
    }






SETTING UP SIGNUP DIRECTIVE
(1)
signup-directive.js will make the signup.html bound to our controller to. Go into the file and make an Immediately invoked function(iffe) .
	Ex
		(function(){
			//code will go here
})();
(2)
next set up the module for this directive remember to pass them through as a string and to add in an empty array to the end of the module.
Ex
  angular
        .module('todo-angular.signup.signup-directive', [])


(3)
We will be making a custom directive for our login.html  use .directive()
Ex
.directive('signup', signup);
(4)
Make the signup directive.
Ex
	    function signup(){
        var directive = {
          // restrict: "E " is restricting it to a html element
          restrict: 'E',
          templateUrl: 'templates/signup.html',
          // set up the controller. controllerAs: is assigning a name to the      controller for when the file is minified
          scope: {},
          // scope:{} is making isolate scope so we don't have scope leak
          controller: signupController,
          controllerAs: 'signupController'
        };
        return directive;
    }






(5)
Make a signupController that we will inject the signupService into . This will bind the directive to the signupService so we have access to the functions and data it will return from api calls.
Ex
	  signupController.$inject = ['signupService'];
(6)
Make the signupController function and pass in the signupService
Ex
    function signupController(signupService) {
      this.submit = function(userName, password) {
        signupService.createUser(userName, password);

      };
    }

(7)
Go into templates/home.html and add in our directive with html tags
Ex
	<signup></signup>

SETTING UP SIGNUP TEMPLATE
To bind angular to this we are going to use a ng-submit and ng-model   
https://docs.angularjs.org/api/ng/directive/ngModel
https://docs.angularjs.org/api/ng/directive/ngSubmit

(1)
Make a form with two inputs one for userName and one for password in templates/signup.html
ex
  <form ng-submit='loginController.submit(userName, password)'>
<!-- use the ng-model for when the form is submitted to update the correct column names in your database tables  -->
      <input placeholder="User Name" ng-model='userName' type="text" class="validate">
<!-- use the ng-model for when the form is submitted to update the correct column names in your database tables  -->
      <input placeholder="Password" ng-model='password' type="password" class="validate">
  <button>Log in
  </button>
</form>
(2)
 go into your index.html and make the script for your login.js  login-service and login-directive.
    <script type="text/javascript" src="/components/signup/signup.js"></script>
    <script type="text/javascript" src="/components/signup/signup-directive.js"></script>
    <script type="text/javascript" src="/components/signup/signup-service.js"></script>


(3)
 go into js/app.js and inject the submit.js module to our app
Ex
	  angular
  		.module('todo-angular', [
    		'ui.router',
    		'todo-angular.login’,
    		‘todo-angular.submit'
  	])








SETTING UP LIST SERVICE
(1)
Make a new module for the list by injecting our service and directive we will be making.
ex
"use strict";

angular
  .module('todo-angular.list',[
    'todo-angular.list.list-item-directive',
    'todo-angular.list.list-service'
]);




(2)
list-service.js will be used to make our api calls to api/list. Go into the file and make an Immediately invoked function(iffe) .
	Ex
		(function(){
			//code will go here
})();
(3)
Make the module for the list-services remember to pass this through as a string and start with the name of the angular app follows by the folder the services in in and then the name of the services then an empty array.
Ex
	  angular
   		 .module('todo-angular.list.list-service', [])

(4)
Now we will create the service. Invoke the .service() function and pass the name of the service as a string then pass the string through as a parameter. We pass through a string  first so angular will not change the parameters for services when the files are minified.
Ex
    .service('listService', listService);
(5)
Inject the listService with ‘$http’, ‘$q’, ‘loginService’ and ‘$state’
The loginService is being injected so we have access to the token in the api data we get back from login-services in we will need this for authorization
https://docs.angularjs.org/api/ng/service/$http
https://docs.angularjs.org/api/ng/service/$q
https://docs.angularjs.org/api/ng/service/$state
Ex
	    listService.$inject = ['$http', '$q', 'loginService', '$state'];















(6)
Let's make what the listServices will return when it is called. We will have it return the getListItems function that we will make next and we will add the rest as we go.
    function listService($http, $q, loginService, $state){
      return {
        getListItems : getListItems
      };

    	};
(7)
getListItems function getListItems() will take no parameters and will need to authorize your request going to the api  and send back the list data with the userId after they log in
Ex     
      function getListItems(){
        var deferred = $q.defer();

        $http({
          method: 'get',
          // setting the herders Authorization to the to getToken()
          // so we are able to pass the token for Authorization
          headers: {
            Authorization: 'Bearer ' + loginService.getToken()
          },
          //pass the loginService.getUserId() to get the users_id for the
          //right user data
          url: 'http://localhost:3000/api/list/' + loginService.getUserId()
        }).then(function successCallback(response) {
          deferred.resolve(response.data.list);
        }, function errorCallback(err) {
          deferred.reject(err);
        });
          return deferred.promise;
      }


(8)
createListItem function createListItem() will take one parameter called newListItem that will be passed through in our from our form we will be making. Again it will need to authorize your request going to the api with the JWT from login to create a new list item
Ex    
      function createListItem(newListItem){
        var deferred = $q.defer();

        $http({
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + loginService.getToken()
          },
          params: {
            list: newListItem,
            users_id: loginService.getUserId()
          },
          url : 'http://localhost:3000/api/list/'
        }).then(function successCallback(response) {
          console.log(response, 'this is the new list ');
          deferred.resolve(response.data.list);
        }, function errorCallback(err) {
          deferred.reject(err);
        });
          return deferred.promise;
      }




(9)
Go to the listServices return statment and add in a new function called createListItem
    function listService($http, $q, loginService, $state){
      return {
        getListItems : getListItems,
	createListItem: createListItem
      };

    	};

(10)
deleteListItem function. deleteListItem() will take one parameter called id that will be passed through in our from our form . Again it will need to authorize your request going to the api with the JWT from login to create a new list item
Ex    
      function createListItem(newListItem){
        var deferred = $q.defer();

        $http({
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + loginService.getToken()
          },
          params: {
            list: newListItem,
            users_id: loginService.getUserId()
          },
          url : 'http://localhost:3000/api/list/'
        }).then(function successCallback(response) {
          console.log(response, 'this is the new list ');
          deferred.resolve(response.data.list);
        }, function errorCallback(err) {
          deferred.reject(err);
        });
          return deferred.promise;
      }




(11)
Go to the listServices return statment and add in a new function called deleteListItem
    function listService($http, $q, loginService, $state){
      return {
        getListItems : getListItems,
	createListItem: createListItem,
deleteListItem: deleteListItem
      };

    	};
(12)
editListItem function editListItem() will take two parameter called id and editListItem that will be passed through in our from our form . Again it will need to authorize your request going to the api with the JWT from login to edit a list item
Ex          function editListItem(id , editListItem){
        var deferred = $q.defer();
        // Simple GET request example:
        // console.log(id, "this is in deleteListItem");
        $http({
          method: 'PUT',
          headers:{
          Authorization: 'Bearer ' + loginService.getToken()
        },
       params: {
          list_id: id,
          editListItem: editListItem
        },
        url: 'http://localhost:3000/api/list/'+ id
      })
      .then(function(response) {
        // this callback will be called asynchronously
        // when the response is available
        deferred.resolve(response.data.list);
        $state.go($state.$current, null, { reload: true });
        console.log('edit working', response);
      }, function errorCallback(err) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        deferred.reject(err);
      });
      return deferred.promise;
      }





(13)
Go to the listServices return statement and add in a new function called deleteListItem
    function listService($http, $q, loginService, $state){
      return {
        getListItems : getListItems,
	createListItem: createListItem,
deleteListItem: deleteListItem,
editListItem: editListItem
      };

    	};

SETTING UP LIST DIRECTIVE



(1)
list-directive.js will make the list-item-directive.html bound to our controller . Go into the file and make an Immediately invoked function(iffe) .
	Ex
		(function(){
			//code will go here
})();
(2)
next set up the module for this directive remember to pass them through as a string and to add in an empty array to the end of the module.
Ex
  angular
    .module('todo-angular.list.list-item-directive', [])


(3)
We will be making a custom directive for our list-item-directive.html  use .directive()
Ex
    .directive('item', item);


(4)
Make a item directive.
Ex
    function item(){
        var directive = {
          // restrict: "E " is restricting it to a html element
          restrict: 'E',
          templateUrl: '/templates/list-item.html',
          // set up the controller. controllerAs: is assigning a name to the controller for when the file is minified
          scope: {
            listItem: '='
          },
          // scope:{ listItem: '='} is making isolate scope making this directive bind to the the listItem
          controller: listItemController,
          controllerAs: 'listItemController'
        };

        return directive;
    }







(5)
Make a listItemController that we will inject the listItemService into . This will bind the directive to the listItemServices so we have access to the functions and data it will return from api calls.
Ex
    listItemController.$inject = ['$scope',  'listService'];


(6)
Make the listItemController function and pass in the listItemService
Ex
    function listItemController($scope, listService) {
      //this will hide a from until we run our showForm function
      $scope.hideForm = true;

      $scope.showForm = function(){
        $scope.hideForm = false;
	//make the ng-model  reset its value when it is hidden
        $scope.editListItem = '';
      };
    //calls to the editListItem function in our listService to pass the form data from the view to the
//services
    $scope.editItem = function(id, editListItem){
        listService.editListItem(id, editListItem);
        $scope.hideForm = true;
        $scope.editListItem = '';
      };
	//takes the id from the deleteListItem form and send that data to the listServices.deleteListItem
      $scope.deleteItem = function(id) {
        listService.deleteListItem(id);
      };

    }









SETTING UP LIST-ITEM-TEMPLATE TEMPLATE
we are going to use a ng-click, ng-model  and ng-hide
https://docs.angularjs.org/api/ng/directive/ngModel
https://docs.angularjs.org/api/ng/directive/ngClick
https://docs.angularjs.org/api/ng/directive/ngHide
(1)
Make a form with two inputs one for userName and one for password in templates/list-item.html
ex

<li>{{listItem.list}}</li>

<button type="button" ng-click="deleteItem(listItem.id)">delete</button>



<button ng-click="showForm()">Edit List Item</button>
<form ng-hide="hideForm" ng-submit='editItem(listItem.id, editListItem)'>
        <input ng-model='editListItem' type="text" class="validate">

        <button  name="button">Edit list item</button>

</form>
<hr>


(2)
 go into your index.html and make the script for your list.js  list-service and list-directive.
    <script type="text/javascript" src="/controllers/list-controller.js"></script>
    <script type="text/javascript" src="/components/list/list.js"></script>
    <script type="text/javascript" src="/components/list/list-item-directive.js"></script>
    <script type="text/javascript" src="/components/list/list-service.js"></script>




(3)
 go into js/app.js and inject the list.js module to our app
Ex
	  angular
  		.module('todo-angular', [
    		'ui.router',
    		'todo-angular.login’,
    		‘todo-angular.submit',
     		'todo-angular.list'
  	  ])


APP.JS SETUP PART TWO:
Adding in the list state and list controller . For more info https://scotch.io/tutorials/angular-routing-using-ui-router




(1)
Making the state for out list.html this will use its own controller se we have change the view without reloading we will make a listController for this state.
Ex
      .state('list', {
        url: '/list',
        templateUrl:'/templates/list.html',
        controller: 'listController'
      });
(2)
Add $locationProvider.html5Mode(true); so angular knows we are using html5


LIST-CONTROLLER.JS SET UP


(1)
list-controller.js will be used to change what our state displays without having to refresh . Go into the file and make an Immediately invoked function(iffe) .
	Ex
		(function(){
			//code will go here
})();
(2)
Make the module for the listController we are going
Ex
	   angular
    		.module('todo-angular')

(3)
Now we will create the controller. Invoke the .controller() function and pass the name of the controller as a string then pass the string through as a parameter. We pass through a string  first so angular will not change the parameters for services when the files are minified.
Ex
    .controller('listController', listController);


(4)
Now that we have made a listController let's inject some angular services into it with $inject . Inject ‘$scope, and the listService that we made as a string into the listController. We will use the listService  for the api data it will return.
Ex
  listController.$inject = ['$scope', 'listService'];


(5)
Set up the listController function this will take a _init() reset the hideForm so it will not show in the list.html until a ng-click is fired and get list items when the state changes.
Ex
	    function listController($scope, listService) {
     		 _init = function() {
      		    $scope.hideForm = true;
      		    _getListItems();
     	    };
(6)
Make the _getListItems(). This function will call to our listService to the getListItems() function and then set our listData = to the response we get back from the listService.getListItems() function. Listdata will be used in our list.html soon.
Ex
	      _getListItems = function(){
        		  listService.getListItems().then(function(response){
          	  $scope.listData = response;
        		  });
     	      };
(7)
Make a showForm function this will be used so when we press a button on the view it will display a form for us.
Ex
	      $scope.showForm = function() {
        $scope.hideForm = false;
      };
(8)
Make a function to past new list items to the listServices
Ex
	      $scope.createListItem = function(newListItem){
       		 listService.createListItem(newListItem)
       		 .then(function newItemCreated(){
        	 	 _getListItems();
      		 $scope.hideForm = true;
         	 $scope.newListItem = '';
      		  });
    	};
(9)
Invoke the _init() function.
Ex
	      _init();

LIST.HTML SET UP
(1)
Start with making the form to hide and show on ng-click with the showForm() function we made in LIST-CONTROLLER SET UP :7  
Ex
	<button ng-click="showForm()">Create New List Item</button>


(2)
make a ng-submit that will use our createListItem from LIST-CONTROLLER SET UP :8 and pass through a newListItem .
Ex
	<form ng-hide="hideForm" ng-submit='createListItem(newListItem)'>
	</form>

(3)
Make a input that will use a ng-model= ‘newListItem’
Ex
	          <input  placeholder="new list item" ng-model='newListItem' type="text" class="validate">

(4)
Make a button type submit that will submit the form and run the createListItem() function and set the hideForm value back to true.
Ex
	          <button type="submit" name="button">Add new list item</button>

(5)
Lets repeat through our data we are getting from our list-controller
Ex
<ul>
<div ng-repeat='listItem in listData'>
(6)
Now we are going to use the item directive we created to put all of our listItems into it
Ex
	  <item list-item="listItem"></item>
