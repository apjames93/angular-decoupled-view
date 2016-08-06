var app = angular.module("todo-angular", [
  "ui.router",
  "todo-angular.signup"
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/templates/home.html"
    });
});
