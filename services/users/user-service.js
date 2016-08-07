(function(){
  angular.module('todo-angular', []).service('userService', userService);
  userService.$inject = ['$http'];
  function userService($http){
    return {
      createUser: createUser
    }

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
          console.log('win')
        }, function errorCallback(response) {
          console.log('loose')
        });
    }

  }
})
