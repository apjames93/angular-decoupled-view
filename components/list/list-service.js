angular.module('todo-angular.list.list-service', []).service('listService', listService);

listService.$inject = ['$http', '$q', 'loginService' ];

function listService($http, $q, loginService){
  return {
    getListItems : getListItems,
    createListItem: createListItem
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
    }, function errorCallback(response) {
      console.log('loose');
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
    }, function errorCallback(response) {
      console.log('loose');
    });
      return deferred.promise;
  }

}
