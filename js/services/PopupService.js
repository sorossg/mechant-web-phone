"use strict";

app.service("PopupService", [function () {
    var self = this;
    this.contentSize = null;
    this.popupLinkElement = "a.popup";
    this.showCallBack = function () {
    };
    this.closeCallback = function () {
    };

    /**
     *
     * @param $options = {
     *              templateUrl: "",
     *              size: "",
     *              closeCallback: func,
 *                  showCallback: func
     *              }
     */
    this.open = function ($options) {
        var templateUrl = $options.templateUrl;
        if ($options.closeCallback) {
            this.closeCallback = $options.closeCallback;
        }
        if ($options.showCallback) {
            this.showCallBack = $options.showCallback;
        }

        var options = {
            afterClose: this.closeHandler.bind(this),
            show: function (popup) {
                self.showHandler(popup, this)
            }
        };

        this.__setContentAppearance($options.size);

        this.__addPopupLinkElementToBody(templateUrl);

        $(this.popupLinkElement).popup(options).trigger('click');

    };

    this.__setContentAppearance = function (size) {
        if (size) {
            this.contentSize = {};
            if (size.top) {
                this.contentSize.top = size.top;
            }

            if (size.left) {
                this.contentSize.left = size.left;
            }

            if (size.right) {
                this.contentSize.right = size.right;
            }

            if (size.height) {
                this.contentSize.height = size.height;
            }

        } else {
            this.contentSize = null
        }
    };

    this.__addPopupLinkElementToBody = function (href) {
        var linkElm = $("<a>", {
            class: "popup",
            href: href
        });

        linkElm.appendTo("body");
    };

    this.close = function () {
        var popup = $(this.popupLinkElement).data('popup');
        if (popup) {
            popup.close();
        }
    };

    this.__checkIsOpening = function () {
        var popup = $(this.popupLinkElement).data('popup');
        if (popup) {
            return true
        } else {
            return false;
        }
    };

    this.closeHandler = function () {
        this.enableDocumentScrollBar();
        this.closeCallback();
        this.__cleanUp();
    };

    this.__cleanUp = function () {
        $(document).off('click.popup');
        $(this.popupLinkElement).each(function (index, item) {
            $(item).remove();
        });
    };

    this.showHandler = function (popup, plugin) {
        this.disableDocumentScrollBar();
        this.showCallBack(popup);
        var cssconfig = this.__getContentAppearance(plugin);
        popup.css(cssconfig);
        try {
            popup[0].children[0].style.overflowY = "auto";
            popup[0].children[1].style.position = "absolute";
            popup[0].children[1].style.right = "30px;";
            popup[0].children[1].style.top = "20px;";
        } catch (err) {
        }
        plugin.o.afterOpen.call(plugin);

    };

    this.__getContentAppearance = function (plugin) {
        var cssConfig;
        if (this.contentSize) {
            cssConfig = {
                top: this.contentSize.top,
                left: this.contentSize.left,
                right: this.contentSize.right,
                height: this.contentSize.height,
                opacity: 1
            }
        } else {
            cssConfig = {
                "width": "450px",
                "text-align": "center",
                "top": plugin.getCenter().top,
                "left": plugin.getCenter().left,
                "opacity": 1
            };
        }
        return cssConfig;
    };

    this.disableDocumentScrollBar = function () {
        $("html").css("overflow-y", "hidden");
    };

    this.enableDocumentScrollBar = function () {
        $("html").css("overflow-y", "auto");
    };
}]);