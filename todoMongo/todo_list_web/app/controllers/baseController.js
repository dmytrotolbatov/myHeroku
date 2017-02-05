(function () {
    angular
        .module('ToDoApp')
        .controller("BaseController", BaseController);

    BaseController.$inject = ["$scope", "requestService", "$utils", "ngDialog"];

    function BaseController($scope, requestService, $utils, ngDialog) {
        $scope.list = [];
        $scope.updateToDo = null;
        $scope.delete = deleteToDo;
        $scope.edit = edit;

        function removeToDo(element) {
            $utils.remove($scope.list, element);
        }

        function deleteToDo(element) {
            requestService.deleteToDo(element._id).then(function (data) {
                removeToDo(element);
            });
        }
        function edit(todo) {
            $scope.updateToDo = angular.copy(todo);
            ngDialog.open({
                className: 'ngdialog-theme-default',
                template: "/app/partials/updateDialogView.html",
                controller: "UpdateDialogController",
                scope: $scope,
                showClose: true
            });
        }
    }
}());
