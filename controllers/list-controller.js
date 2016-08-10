//LIST-CONTROLLER.JS SET UP 1
(function(){
  //LIST-CONTROLLER.JS SET UP 2
  angular
    .module('todo-angular')
    //LIST-CONTROLLER.JS SET UP 3
    .controller('listController', listController);
    //LIST-CONTROLLER.JS SET UP 4
  listController.$inject = ['$scope', 'listService'];
  //LIST-CONTROLLER.JS SET UP 5
    function listController($scope, listService) {
      _init = function() {
        $scope.hideForm = true;
        _getListItems();
      };
      //LIST-CONTROLLER.JS SET UP 6
      _getListItems = function(){
        listService.getListItems().then(function(response){
          $scope.listData = response;
        });
      };
      //LIST-CONTROLLER.JS SET UP 7
      $scope.showForm = function() {
        $scope.hideForm = false;
      };
      //LIST-CONTROLLER.JS SET UP 8
      $scope.createListItem = function(newListItem){
        listService.createListItem(newListItem)
        .then(function newItemCreated(){
          _getListItems();
          $scope.hideForm = true;
          $scope.newListItem = '';
        });
      };

      _init();
    }

})();
