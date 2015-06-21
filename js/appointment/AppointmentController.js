'use strict';
app.controller('AppointmentController',
    ['$scope',
        'WeekdaysService',
        function ($scope,
                  WeekdaysService
        ) {

            $scope.data = {};

            WeekdaysService.renderWeekDays();
        }]);
