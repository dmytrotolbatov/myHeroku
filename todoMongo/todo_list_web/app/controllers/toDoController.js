(function () {
    angular
        .module('ToDoApp')
        .controller("ToDoController", ToDoController);

    ToDoController.$inject = ["$scope", "requestService", "$utils", "ngDialog", "$controller"];
    
    function ToDoController($scope, requestService, $utils, ngDialog, $controller) {
        angular.extend(this,$controller('BaseController', {
            $scope: $scope
        }));

        $scope.currentToDo = "";
        $scope.add = add;
        $scope.complete = complete;
        $scope.updateData = updateData;

        $scope.updateData();

        function updateData() {
            requestService.getToDoList().then(function (data) {
                $scope.list = data;
            });
        }
        function removeToDo(element) {
            $utils.remove($scope.list, element);
        }

        function deleteToDo(element) {
            requestService.deleteToDo(element._id).then(function (data) {
                removeToDo(element);
            });
        }

        function complete(element) {
            requestService.setAsCompleted(element).then(function (data) {
                removeToDo(element);
            });
        }

        function add() {
            if ($scope.currentToDo && $scope.currentToDo.length > 2) {
                requestService.addToDo({
                    value: $scope.currentToDo
                }).then(function (data) {
                    $scope.list.push(data);
                    $scope.currentToDo = "";
                });
            }
        }
    }
}());