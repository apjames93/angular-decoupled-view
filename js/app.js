// (APP.JS SETUP PART ONE:1) Immediately invoked function expression (iffe)
(function(){
  //(APP.JS SETUP PART ONE: 2) setting the name of the app and saying we will use ui.router
  angular
  .module('todo-angular', [
    'ui.router',
    //SETTING UP LOGIN TEMPLATE : 3
    'todo-angular.login',
    // SETTING UP SIGNUP TEMPLATE: 3
    'todo-angular.signup',
    'todo-angular.list'
  ])
  //(APP.JS SETUP PART ONE:3)
  .config(function($stateProvider, $urlRouterProvider, $locationProvider){
      //(APP.JS SETUP PART ONE:4)
    $urlRouterProvider.otherwise('/');

      //(APP.JS SETUP PART ONE:5)
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/templates/home.html'
      })
      //APP.JS SETUP PART TWO:1
      .state('list', {
        url: '/list',
        templateUrl:'/templates/list.html',
        controller: 'listController'
      });
      //APP.JS SETUP PART TWO: 2
      $locationProvider.html5Mode(true);
  });
//invokes (iffe) anytime the file is accessed
})();
