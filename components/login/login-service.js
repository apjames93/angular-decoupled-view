//SETTING UP LOGIN SERVICE : 2
(function(){
  //SETTING UP LOGIN SERVICE : 3
  angular
    .module('todo-angular.login.login-service', [])
    //SETTING UP LOGIN SERVICE : 4
    .service('loginService', loginService);
    //SETTING UP LOGIN SERVICE : 5
    loginService.$inject = ['$http', '$location'];

    //SETTING UP LOGIN SERVICE : 6
    function loginService($http, $location){
      //SETTING UP LOGIN SERVICE : 7
      var user = {};
      //SETTING UP LOGIN SERVICE : 8
      return {
        getToken: getToken,
        getUserId : getUserId,
        loginUser: loginUser
      };
      function _setUserData(data) {
        user = data;
        // console.log(user, 'user');
      }
      //SETTING UP LOGIN SERVICE : 10
      function getToken() {
          return user.token;
      }
      //SETTING UP LOGIN SERVICE : 11
      function getUserId(){
        return user.userId;
      }
      //SETTING UP LOGIN SERVICE : 12
      function loginUser(userName, password) {
        //SETTING UP LOGIN SERVICE : 13
        $http({
          method: 'post',
          params: {
            userName: userName,
            password: password
          },
          // url: 'http://localhost:3000/auth/login'
              url: 'https://decoupled-api-server.herokuapp.com/auth/login'
        }).then(function successCallback(response) {
            console.log( response);
            _setUserData(response.data);
            $location.path('/list');
          }, function errorCallback(err) {
            console.log(err);
          });
      }

    }


})();
