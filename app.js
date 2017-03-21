'use strict';

(function () {
    var app = angular.module("taskApp", ['ngRoute', 'angular-loading-bar']);
    app.config(function ($routeProvider) {
        $routeProvider
        .when("/task", {
            templateUrl: 'app/views/task.html',
            controller: "TaskCtrl"
        })
        .when("/task/:taskId", {
            templateUrl: 'app/views/taskdetail.html',
            controller: "taskAddCtrl"
        })
        .otherwise({ redirectTo: "/task" })
    });
}());
