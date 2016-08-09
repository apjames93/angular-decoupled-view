(function(){
  angular
    .module('todo-angular.list.list-item-directive', [])
    .directive('item', item);

    function item(){
        // console.log('am I here');
        var directive = {
          // restrict: "E " is restricting it to a html element
          restrict: 'E',
          templateUrl: '/templates/list-item.html',
          // set up the controller. controllerAs: is assinging a name to the controller for when the file is minified
          scope: {
            listItem: '='
          },
          // scope:{ listItem: '='} is making isolate scope making this directive bind to the the listItem 
          controller: listItemController,
          controllerAs: 'listItemController'
        };

        return directive;
    }

    listItemController.$inject = ['$scope',  'listService'];

    function listItemController($scope, listService) {

      $scope.hideForm = true;

      $scope.showForm = function(){
        $scope.hideForm = false;
        $scope.editListItem = '';
      };

      $scope.editItem = function(id, editListItem){
        listService.editListItem(id, editListItem);
        $scope.hideForm = true;
        $scope.editListItem = '';
      };

      $scope.deleteItem = function(id) {
        listService.deleteListItem(id);
      };

    }

})();
