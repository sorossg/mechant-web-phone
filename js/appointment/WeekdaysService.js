/**
 * Created by tiger on 21/06/2015.
 */
"use strict";

app.service("WeekdaysService", ["$templateCache", function ($templateCache) {
    var self = this;
    var weekListTemplate = $templateCache.get("templates/week_list.html");
    this.showing_week_number = moment().week();
    this.$weekDays = $("#week_days");
    this.$weekList = $(weekListTemplate);
    this.$firstWeek = this.$weekList.find(".first_week");
    this.$secondWeek = this.$weekList.find(".second_week");
    this.$thirdWeek = this.$weekList.find(".third_week");
    this.$weekList.appendTo(self.$weekDays);
    this.slider = {};

    this.renderWeekDays = function () {
        this.__populateDateForThreeWeekLists();
        this.renderSlider();
    };

    this.renderSlider = function () {
        self.slider = $('.bxslider').bxSlider({
            swipeThreshold: 100,
            controls: false,
            startSlide: 1,
            pager: false,
            speed: 300,
            onSlideAfter: this.__onSlideAfterHandler.bind(this)
        });
    };

    this.__calculateDateRangeForThreeWeeks = function (showing_week_number) {
        var startDate = moment().week(showing_week_number - 1).startOf("week");
        var endDate = moment().week(showing_week_number + 1).endOf("week");
        var dateRange = [];
        for (var i = startDate; (i.isBefore(endDate)) || (i.isSame(endDate)); i.add(1, "days")) {
            dateRange.push(moment(i));
        }
        return dateRange
    };

    this.__populateDateForWeek = function ($weekElement, $startIndexOfDayRange) {
        var date;
        var startIndexOfDayRange = $startIndexOfDayRange;
        var dayRange = this.__calculateDateRangeForThreeWeeks(this.showing_week_number);

        $weekElement.find('li').each(function () {
            date = dayRange[startIndexOfDayRange];
            $(this).find('.day_of_week').text(date.format("ddd"));
            $(this).find('.date_of_month').text(date.date());
            startIndexOfDayRange++
        });
    };

    this.__populateDateForThreeWeekLists = function () {
        this.__populateDateForWeek(this.$firstWeek, 0);
        this.__populateDateForWeek(this.$secondWeek, 7);
        this.__populateDateForWeek(this.$thirdWeek, 14);
    };

    this.__onSlideAfterHandler = function ($slideElement, oldIndex, newIndex) {
        if (this.__isDecreaseDirection(oldIndex, newIndex)) {
            this.__decreaseShowingWeek();
        } else {
            this.__increaseShowingWeek();
        }
        this.__rePopulateDateForNextAndPrevWeek($slideElement);
    };

    this.__rePopulateDateForNextAndPrevWeek = function ($slideElement) {
        var nextWeekOrder = $slideElement.next().attr("data-order");
        var prevWeekOrder = $slideElement.prev().attr("data-order");

        $("[data-order='"+ nextWeekOrder+"']").each(function () {
            self.__populateDateForWeek($(this), 14);
        });

        $("[data-order='"+ prevWeekOrder+"']").each(function () {
            self.__populateDateForWeek($(this), 0);
        });
    };

    this.__increaseShowingWeek = function () {
        this.showing_week_number++;
    };

    this.__decreaseShowingWeek = function () {
        this.showing_week_number--;
    };

    this.__isDecreaseDirection = function (oldIndex, newIndex) {
        return (oldIndex == 1 && newIndex == 0) || (oldIndex == 0 && newIndex == 2) || (oldIndex == 2 && newIndex == 1)

    }
}]);
