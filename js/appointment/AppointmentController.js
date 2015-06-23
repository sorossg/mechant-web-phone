'use strict';
app.controller('AppointmentController',
    ['$scope',
        'WeekdaysService',
        'PopupService',
        function ($scope,
                  WeekdaysService,
                  PopupService
        ) {

            $scope.data = {};

            WeekdaysService.renderWeekDays();
        }]);
