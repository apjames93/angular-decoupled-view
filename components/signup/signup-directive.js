//SETTING UP SIGNUP DIRECTIVE 1
(function(){
  //SETTING UP SIGNUP DIRECTIVE 2
  angular
    .module('todo-angular.signup.signup-directive', [])
    //SETTING UP SIGNUP DIRECTIVE 3
    .directive('signup', signup);
    //SETTING UP SIGNUP DIRECTIVE 4
    function signup(){
        var directive = {
          // restrict: "E " is restricting it to a html element
          restrict: 'E',
          templateUrl: 'templates/signup.html',
          // set up the controller. controllerAs: is assinging a name to the controller for when the file is minified
          scope: {},
          // scope:{} is making isolate scope so we dont have scope leak
          controller: signupController,
          controllerAs: 'signupController'
        };
        return directive;
    }
    //SETTING UP SIGNUP DIRECTIVE 5
    signupController.$inject = ['signupService'];
    //SETTING UP SIGNUP DIRECTIVE 6
    function signupController(signupService) {
      this.submit = function(userName, password) {
        signupService.createUser(userName, password);

      };
    }

})();
