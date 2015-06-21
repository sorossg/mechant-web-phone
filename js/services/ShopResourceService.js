"use strict";

app.service("ShopResourceService", ["Configuration","AjaxService", function (Configuration, AjaxService) {
    var self = this;
    var API_URL = {
        shopSettingInfo :Configuration.api.shopSettingInfo,
        shopWokingSchedule: Configuration.api.shopWokingInfo
    };

    this.getShopSettingsInfos = function (shopId) {
        var deferred = Q.defer();
        var url = self.__processUrl1(shopId);

        AjaxService.ajax({
            method: "GET",
            url: url
        }).then(function (data) {
            deferred.resolve(data);
        }, function (error) {

        });

        return deferred.promise;
    };

    this.getShopWorkingSchedule = function (shopId, fromDate, toDate) {
        var deferred = Q.defer();
        var url = self.__processUrl2(shopId, fromDate, toDate);

        AjaxService.ajax({
            method: "GET",
            url: url
        }).then(function (data) {
            deferred.resolve(data);
        }, function (error) {

        });

        return deferred.promise;
    };

    this.__processUrl1 = function (shopId) {
        return API_URL.shopSettingInfo + "?shopId=" + shopId;
    };

    this.__processUrl2 = function (shopId, fromDate, toDate) {
        return API_URL.shopWokingSchedule + "?shopId=" + shopId + "&fromDate=" + fromDate + "&toDate=" + toDate;
    };
}]);