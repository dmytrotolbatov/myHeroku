(function () {
    angular
        .module('ToDoApp')
        .controller("CompletedController", CompletedController);

    CompletedController.$inject = ["$scope", "requestService", "$utils", "ngDialog", "$controller"];

    function CompletedController($scope, requestService, $utils, ngDialog, $controller) {
        angular.extend(this, $controller('BaseController', {
            $scope: $scope
        }));
        
        $scope.updateData = function () {
            requestService.getCompletedList().then(function (data) {
                $scope.list = data;
            });
        };

        $scope.updateData();
    }
}());