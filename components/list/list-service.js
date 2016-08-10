//SETTING UP LIST SERVICE 2
(function(){
  //SETTING UP LIST SERVICE 3
  angular
    .module('todo-angular.list.list-service', [])
    //SETTING UP LIST SERVICE 4
    .service('listService', listService);
    //SETTING UP LIST SERVICE 5
    listService.$inject = ['$http', '$q', 'loginService', '$state'];
    //SETTING UP LIST SERVICE 6
    function listService($http, $q, loginService, $state){
      return {
        getListItems : getListItems,
        //SETTING UP LIST SERVICE 9
        createListItem: createListItem,
        //SETTING UP LIST SERVICE 11
        deleteListItem: deleteListItem,
        //SETTING UP LIST SERVICE 13
        editListItem: editListItem
      };
      //SETTING UP LIST SERVICE 7
      function getListItems(){
        var deferred = $q.defer();

        $http({
          method: 'get',
          // setting the herders Authorization to the to getToken()
          // so we are able to pass the token for Authorization
          headers: {
            Authorization: 'Bearer ' + loginService.getToken()
          },
          //pass the loginService.getUserId() to get the users_id for the
          //right user data
          url: 'http://localhost:3000/api/list/' + loginService.getUserId()
        }).then(function successCallback(response) {
          deferred.resolve(response.data.list);
        }, function errorCallback(err) {
          deferred.reject(err);
        });
          return deferred.promise;
      }

      //SETTING UP LIST SERVICE 8
      function createListItem(newListItem){
        var deferred = $q.defer();

        $http({
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + loginService.getToken()
          },
          params: {
            list: newListItem,
            users_id: loginService.getUserId()
          },
          url : 'http://localhost:3000/api/list/'
        }).then(function successCallback(response) {
          console.log(response, 'this is the new list ');
          deferred.resolve(response.data.list);
        }, function errorCallback(err) {
          deferred.reject(err);
        });
          return deferred.promise;
      }
      //SETTING UP LIST SERVICE 10
      function deleteListItem(id){
        var deferred = $q.defer();
        // Simple GET request example:
        // console.log(id, "this is in deleteListItem");
        $http({
          method: 'delete',
          headers:{
          Authorization: 'Bearer ' + loginService.getToken()
        },
       params: {
          list_id: id
        },
        url: 'http://localhost:3000/api/list/'+id
      })
      .then(function(response) {
        // this callback will be called asynchronously
        // when the response is available
        deferred.resolve(response.data.list);
        $state.go($state.$current, null, { reload: true });
        console.log('delete working', response);
      }, function errorCallback(err) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        deferred.reject(err);
      });
      return deferred.promise;
      }
      //SETTING UP LIST SERVICE 12
      function editListItem(id , editListItem){
        var deferred = $q.defer();
        // Simple GET request example:
        // console.log(id, "this is in deleteListItem");
        $http({
          method: 'PUT',
          headers:{
          Authorization: 'Bearer ' + loginService.getToken()
        },
       params: {
          list_id: id,
          editListItem: editListItem
        },
        url: 'http://localhost:3000/api/list/'+ id
      })
      .then(function(response) {
        // this callback will be called asynchronously
        // when the response is available
        deferred.resolve(response.data.list);
        $state.go($state.$current, null, { reload: true });
        console.log('edit working', response);
      }, function errorCallback(err) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        deferred.reject(err);
      });
      return deferred.promise;
      }

    }


})();
