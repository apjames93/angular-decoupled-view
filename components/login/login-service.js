angular.module('todo-angular.login.login-service', []).service('loginService', loginService);

loginService.$inject = ['$http', '$location'];

function loginService($http, $location){
  return {
    loginUser: loginUser
  };

  function loginUser(userName, password) {
    console.log('hello', userName, password);
    $http({
      method: 'post',
      params: {
        userName: userName,
        password: password
      },
      url: 'http://localhost:3000/auth/login'
    }).then(function successCallback(response) {
        console.log('win', response);
        $location.path('/list');
      }, function errorCallback(response) {
        console.log('loose');
      });
  }

}
