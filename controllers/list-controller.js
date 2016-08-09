(function(){
  app
  .controller('listController', listController);

  listController.$inject = ['$scope', 'listService'];

    function listController($scope, listService) {
      _init = function() {
        $scope.hideForm = true;
        _getListItems();
      };

      _getListItems = function(){
        listService.getListItems().then(function(response){
          $scope.listData = response;
        });
      };

      $scope.showForm = function() {
        $scope.hideForm = false;
      };

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
