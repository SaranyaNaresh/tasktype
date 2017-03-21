(function () {
    var taskApp = angular.module("taskApp");

    var TaskCtrl = function ($scope, $http) {
        $scope.working = 'Angular is Working';

        var onError = function (error) {
            $scope.error = error.data;
        };

        var onPersonGetCompleted = function (response) {
            $scope.tasks = response.data;
            console.log($scope.tasks);
        }

        var refresh = function () {
            $http.get('/tasks')
                .then(onPersonGetCompleted, onError);
            console.log('Response received...');
        }

        refresh();

        var onGetByIdCompleted = function (response) {
            $scope.task = response.data;
            console.log(response.data);
        };

        $scope.searchTask = function (id) {
            $http.get('/task/' + id)
                .then(onGetByIdCompleted, onError);
            console.log(id);
        };

        var onAddTaskCompleted = function (response) {
            $scope.task = response.data;
            console.log(response.data);
            refresh();
        };
        $scope.addTask = function (task) {
            $http.post('/addTask', task)
                .then(onAddTaskCompleted, onError);
            console.log(person);
        };

        $scope.deleteTask = function (id) {
            $http.delete('/deleteTask/' + id)
                .then(onTaskDeleteCompleted, onError);
            console.log(id);
        };

        var onTaskDeleteCompleted = function (response) {
            $scope.task = response.data;
            console.log(response.data);
            refresh();
        };

        $scope.updateTask = function (task) {
            $http.put("/updateTask", task)
                .then(onUpdateTaskCompleted, onError);
            console.log(task);
        };

        var onUpdateTaskCompleted = function (response) {
            $scope.task = null;//response.data;
            console.log(response.data);
            refresh();
        };

    }
    taskApp.controller('TaskCtrl', TaskCtrl);
}());