angular.module('todo-angular.login.login-service', []).service('loginService', loginService);

loginService.$inject = ['$http', '$location'];

function loginService($http, $location){
  var user = {};

  return {
    loginUser: loginUser,
    getToken: getToken,
    getUserId : getUserId

  };

  function getToken() {
      return user.token;
  }

  function _setUserData(data) {
    user = data;
    // console.log(user, 'user');
  }
  function getUserId(){
    return user.userId;
  }


  function loginUser(userName, password) {
    // console.log('hello', userName, password);
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
      }, function errorCallback(response) {
        // console.log('loose');
      });
  }

}
