'use strict';

var app = null;

(function main() {
    app = angular.module('merchantWeb',
        [
            'ngRoute'
        ]);

    app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider
            .when('/', {controller: 'AppointmentController', templateUrl: 'templates/appointment.html'})
            .otherwise({
                redirectTo: '/'
            });

        var $i18nextProviderOptions = {
            lng: 'en',
            useCookie: false,
            useLocalStorage: false,
            fallbackLng: 'en',
            resGetPath: 'assets/translations/__lng__.json'
        };

        i18n.init($i18nextProviderOptions);
    }]);

    var manifest = [
        'js/common/Configuration',

        'js/services/i18nService',
        'js/services/AjaxService',
        'js/services/ShopResourceService',
        'js/services/PopupService',

        'js/appointment/AppointmentController.js',
        'js/appointment/WeekdaysService.js'
    ];

    var templates = [
        'templates/week_list.html'
    ];

    app.run(["$templateRequest","$templateCache",function ($templateRequest, $templateCache) {
        if(templates.length){
            templates.forEach(function (template) {
                $templateRequest(template).then(function (data) {
                    $templateCache.put(template, data);
                });
            })
        }
    }]);

    require(manifest, function () {
        angular.bootstrap(document, ['merchantWeb']);
    })
}());
