(function () {
    angular
        .module("ToDoApp")
        .controller("UpdateDialogController", UpdateDialogController);

    UpdateDialogController.$inject = ["$scope", "requestService", "$utils"];

    function UpdateDialogController($scope, requestService, $utils) {
        $scope.confirmUpdate = function () {
            if ($scope.updateToDo && $scope.updateToDo.value && $scope.updateToDo.length > 2) {
                requestService.updateToDo($scope.updateToDo)
                    .then(function (data) {
                        $scope.updateToDo = null;
                        $utils.replace($scope.list, data, function (x) {
                            return x._id === data._id;
                        });
                    })
                    .catch(function (err) {
                        $scope.updateToDo = null;
                    });
                $scope.closeThisDialog();
            }
        }
    }
}());
