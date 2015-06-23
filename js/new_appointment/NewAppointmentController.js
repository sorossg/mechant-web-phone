"use strict";

app.controller("NewAppointmentController",['$scope',function($scope){
    var SELECT_SERVICE_STEP = 1, SELECT_STAFF_STEP = 2, SELECT_TIME_STEP = 3, FILL_DETAILS_STEP = 4;

    $scope.currentStep = SELECT_SERVICE_STEP;
}]);