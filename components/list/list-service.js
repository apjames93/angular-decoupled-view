angular.module('todo-angular.list.list-service', [])
  .service('listService', listService);

listService.$inject = ['$http', '$q', 'loginService', '$state'];

function listService($http, $q, loginService, $state){
  return {
    getListItems : getListItems,
    createListItem: createListItem,
    deleteListItem: deleteListItem
  };
  function getListItems(){
    var deferred = $q.defer();

    $http({
      method: 'get',
  // setting the herders Authorization to the to getToken() so we are able to pass the token for Authorization
      headers: {
        Authorization: 'Bearer ' + loginService.getToken()
      },
      url: 'http://localhost:3000/api/list/' + loginService.getUserId()
    }).then(function successCallback(response) {
      deferred.resolve(response.data.list);
    }, function errorCallback(err) {
      console.log(err);
    });
      return deferred.promise;
  }
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
      url : 'http://localhost:3000/api/list/newListItem'
    }).then(function successCallback(response) {
      console.log(response, 'this is the new list ');
      deferred.resolve(response.data.list);
    }, function errorCallback(err) {
      console.log(err);
    });
      return deferred.promise;
  }


  function deleteListItem(id){
    var deferred = $q.defer();
    // Simple GET request example:
    // console.log(id, "this is in deleteListItem");
    $http({
      method: 'GET',
      headers:{
      Authorization: 'Bearer ' + loginService.getToken()
    },
   params: {
      list_id: id
    },
    url: 'http://localhost:3000/api/list/'+ id+'/delete'
  })
  .then(function(response) {
    // this callback will be called asynchronously
    // when the response is available
    deferred.resolve(response.data.list);
    $state.go($state.$current, null, { reload: true });
    console.log('delete working', response);
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log('delete not working ', response);
  });
  return deferred.promise;
  }
}
