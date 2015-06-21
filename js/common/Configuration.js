"use strict";

app.constant("Configuration", (function () {
    var configuration = {};
    var BASE_URL = "http://test3.sunnypoint.jp/appointment/api/";
    var VERSION = "v1.1";

    configuration.api = {
        shopSettingInfo: BASE_URL + VERSION + "/shop/getShopSettingInfos",
        shopWokingInfo: BASE_URL + VERSION + "/booking/listSchedulersInfosByShop"
    };

    return configuration;
})());

