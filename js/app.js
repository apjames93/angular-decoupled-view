var app = angular.module('todo-angular', [
  'ui.router',
  'todo-angular.signup',
  'todo-angular.login',
  'todo-angular.list'
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/templates/home.html'
    })
    .state('list', {
      url: '/list',
      templateUrl:'/templates/list.html',
      controller: 'listController'
    });
    $locationProvider.html5Mode(true);
});
