"use strict";

app.service("AjaxService", [function () {
    this.ajax = function (params) {
        return Q($.ajax(params));
    }
}]);

