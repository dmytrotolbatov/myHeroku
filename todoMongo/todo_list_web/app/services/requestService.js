(function () {
    angular
        .module("ToDoApp")
        .service("requestService", requestService);

    requestService.$inject = ["$http"];

    function requestService($http) {

        var TODO_NAME = "todo";
        var COMPLETED_NAME = "completed";

        return {
            getToDoList: function () {
                return $http.get(API_URL + TODO_NAME).then(function (response) {
                    return response.data;
                });
            },
            getCompletedList: function () {
                return $http.get(API_URL + COMPLETED_NAME).then(function (response) {
                    return response.data;
                });
            },
            addToDo: function (todo) {
                return $http.post(API_URL + TODO_NAME, todo).then(function (response) {
                    return response.data;
                });
            },
            updateToDo: function (todo) {
                return $http.put(API_URL + TODO_NAME, todo).then(function (response) {
                    return response.data;
                });
            },
            deleteToDo: function (id) {
                return $http.delete(API_URL + TODO_NAME + "/" + id).then(function (response) {
                    return response.data;
                });
            },
            setAsCompleted: function (todo) {
                return $http.put(API_URL + COMPLETED_NAME, todo).then(function (response) {
                    return response.data;
                });
            }
        }
    }
}());
