(function () {
    angular.module("ToDoApp", ["ngRoute", "ngDialog"]);
}());

(function () {
    angular
        .module("ToDoApp")
        .config(routing);

    routing.$inject = ["$routeProvider", "$locationProvider"];

    function routing($routeProvider, $locationProvider) {
        $routeProvider.when('/',
            {
                templateUrl:'app/partials/toDoView.html',
                controller:'ToDoController'
            });
        $routeProvider.when('/completed',
            {
                templateUrl:'app/partials/completedView.html',
                controller:'CompletedController'
            });
        $locationProvider.html5Mode(false).hashPrefix('');
    }
}());
