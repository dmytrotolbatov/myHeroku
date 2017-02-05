(function () {
    angular
        .module("ToDoApp")
        .service("$utils", $utils);

    function $utils() {
        return{
            remove: remove,
            firstOrDefault: firstOrDefault,
            lastOrDefault: lastOrDefault,
            replace: replace
        };

        function remove(array, element) {
            if (array && array.length > 0) {
                var index = null;
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == element) {
                        index = i;
                        break;
                    }
                }
                if (index !== null)
                    array.splice(index, 1);
            }
        }

        function firstOrDefault(array, callback) {
            if (array && array.length > 0) {
                if (callback) {
                    for (var key in array) {
                        if (callback(array[key]))
                            return array[key];
                    }
                    return null;
                }
                return array[0];
            }
            return null;
        }

        function lastOrDefault(array, callback) {
            if (array && array.length > 0) {
                if (callback) {
                    for (var key = array.length - 1; key >= 0; key--) {
                        if (callback(array[key]))
                            return array[key];
                    }
                    return null;
                }
                return array[array.length - 1];
            }
            return null;
        }

        function replace(array, newVal, callback) {
            if (array && array.length > 0) {
                if (callback) {
                    for (var key in array) {
                        if (callback(array[key])) {
                            array[key] = newVal;
                        }
                    }
                }
            }
        }
    }
}());
