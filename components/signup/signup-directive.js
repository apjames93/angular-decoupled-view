angular
  .module('todo-angular.signup.signup-directive', [])
  .directive('signup', signup);

function signup(){
    var directive = {
// restrict: "E " is restricting it to a html element
      restrict: 'E',
      templateUrl: 'templates/signup.html',
// set up the controller. controllerAs: is assinging a name to the controller for when the file is minified
      scope: {},
// scope:{} is making isolate scope so we dont have scope leek 
      controller: signupController,
      controllerAs: 'signupController'
    }

    return directive;
}

signupController.$inject = ['signupService'];

function signupController(signupService) {
  signupController = this;

  signupController.submit = function(userName, password) {
    signupService.createUser(userName, password);
    // console.log('hello', userName, password);
    // $http({
    //   method: 'post',
    //   params: {
    //     userName: userName,
    //     password: password
    //   },
    //   url: 'http://localhost:3000/auth/signup'
    // }).then(function successCallback(response) {
    //     console.log('win')
    //   }, function errorCallback(response) {
    //     console.log('loose')
    //   });
  }

}
