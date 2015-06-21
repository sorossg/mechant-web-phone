"use strict";

app.service("StorageService", [function () {

    this.storage = window.localStorage;

    this.retrieve = function (storageName) {
        var value = this.storage.getItem(storageName);
        try {
            value = JSON.parse(value);
        } catch (e) {
            console.log(e);
        }
        return value;
    };

    this.store = function (storageName, storageValue) {
        var s_Value;
        if (typeof storageValue !== 'string')
            s_Value = JSON.stringify(storageValue);
        else
            s_Value = storageValue;

        this.storage.setItem(storageName, s_Value);
    };

    this.remove = function (storageName) {
        this.storage.removeItem(storageName);
    };
}]);