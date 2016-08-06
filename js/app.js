var app = angular.module("todo-angular", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $urlRouterProvider.otherwise("/");
});
