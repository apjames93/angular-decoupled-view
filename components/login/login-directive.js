(function(){
  angular
    .module('todo-angular.login.login-directive', [])
    .directive('login', login);

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

  loginController.$inject = ['loginService'];

  function loginController(loginService) {

    this.submit = function(userName, password) {
      loginService.loginUser(userName, password);
    };
  }
  
})();
