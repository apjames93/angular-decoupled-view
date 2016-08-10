//SETTING UP LOGIN DIRECTIVE :1
(function(){
  //SETTING UP LOGIN DIRECTIVE :2
  angular
    .module('todo-angular.login.login-directive', [])
    //SETTING UP LOGIN DIRECTIVE :3
    .directive('login', login);
    //SETTING UP LOGIN DIRECTIVE :4
    function login(){
      var directive = {
        // restrict: "E " is restricting it to a html element
      restrict: 'E',
      templateUrl: 'templates/login.html',
      // set up the controller. controllerAs: is assinging a name to the controller for when the file is minified
      scope: {},
      // scope:{} is making isolate scope so we dont have scope leek
      controller: loginController,
      controllerAs: 'loginController'
    };
    return directive;
  }
  //SETTING UP LOGIN DIRECTIVE :5
  loginController.$inject = ['loginService'];
  //SETTING UP LOGIN DIRECTIVE :6
  function loginController(loginService) {
    //making a function to get the userName and password from a form submit from login.html
    this.submit = function(userName, password) {
      loginService.loginUser(userName, password);
    };
  }

})();
