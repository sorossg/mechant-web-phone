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
    this.$firstWeek = this.$weekList.find("#first_week");
    this.$secondWeek = this.$weekList.find("#second_week");
    this.$thirdWeek = this.$weekList.find("#third_week");
    this.$weekList.appendTo(self.$weekDays);

    this.renderWeekDays = function () {
        this.__populateDateForThreeWeekLists();
        this.transformToSlider();
    };

    this.transformToSlider = function () {
        $('.bxslider').bxSlider({
            swipeThreshold: 100,
            controls: false,
            startSlide:1,
            onSlideAfter: this.__onSlideAfterHandler.bind(this)
        });
    };

    this.__calculateDateRangeForThreeWeeks = function (showing_week_number) {
        var startDate = moment().week(showing_week_number - 1);
        var endDate = moment().week(showing_week_number + 1).add(6, "days");
        var dateRange = [];
        for (var i = startDate; (i.isBefore(endDate)) || (i.isSame(endDate)); i.add(1, "days")) {
            dateRange.push(moment(i));
        }
        return dateRange
    };

    this.__populateDateForWeek = function ($weekElement, startIndexOfDayRange) {
        var date;
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
        this.__increaseShowingWeek();
        //this.__populateDateForWeek($slideElement.prev(), 0);
        //this.__populateDateForWeek($slideElement.next(), 14);
    };

    this.__increaseShowingWeek = function () {
        this.showing_week_number++;
    };

    this.__decreaseShowingWeek = function () {
        this.showing_week_number--;
    }
}]);
