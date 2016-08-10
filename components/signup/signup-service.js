//SETTING UP SIGNUP SERVICE: 2
(function(){
  //SETTING UP SIGNUP SERVICE: 3
  angular
  .module('todo-angular.signup.signup-service', [])
  //SETTING UP SIGNUP SERVICE: 4
  .service('signupService', signupService);
  //SETTING UP SIGNUP SERVICE: 5
  signupService.$inject = ['$http', 'loginService'];
  //SETTING UP SIGNUP SERVICE: 6
  function signupService($http, loginService){
    return {
      createUser: createUser
    };
    //SETTING UP SIGNUP SERVICE: 7
    function createUser(userName, password) {
      console.log('hello', userName, password);
      $http({
        method: 'post',
        params: {
          userName: userName,
          password: password
        },
        url: 'http://localhost:3000/auth/signup'
      }).then(function successCallback(response) {
          console.log('win', response);
          loginService.loginUser(userName, password);
        }, function errorCallback(response) {
          console.log('loose');
        });
    }
  }

})();
