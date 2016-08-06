angular
  .module('todo-angular.signup.signup-directive', [])
  .directive('signup', signup);

function signup(){
    var directive = {
// restrict: "E " is restricting it to a html element
      restrict: 'E',
      templateUrl: 'templates/signup.html',
// set up the controller. controllerAs: is assinging a name to the controller for when the file is minified
      controller: signupController,
      controllerAs: 'signupController'
    }

    return directive;
}

signupController.$inject = ['$http'];

function signupController($http) {
  signupController = this;

  signupController.submit = function(userName, password) {
    console.log('hello', userName, password);
    $http({
      method: 'post',
      params: {
        userName: userName,
        password: password
      },
      url: 'http://localhost:3000/auth/signup'
    }).then(function successCallback(response) {
        console.log('win')
      }, function errorCallback(response) {
        console.log('loose')
      });
  }

}
