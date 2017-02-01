define(['plugins/router', 'account/account', 'company/Company', 'viewmodels/ordersviewmodel', 'order/order', 'quote/quote'], function (router, account, Company, ordersviewmodel, Order, Quote) {
    var ctor = function () {

        var currentYear = new Date().getFullYear();
        var self = this;

        self.currentYearOrdersTotal = ko.observable();
        self.salesTotalByYears = ko.observableArray([]);
        self.salesByQuarter = ko.observableArray([]);
        self.averageByQuarter = ko.observableArray([]);
        self.salesByMonth = ko.observableArray([]);
        self.salesCountByQuarter = ko.observableArray([]);

        self.CurrentYearQuotesTotal = ko.observable();
        self.quotesTotalByYears = ko.observableArray([]);
        self.quotesByQuarter = ko.observableArray([]);
        self.averageQuotesByQuarter = ko.observableArray([]);
        self.quotesByMonth = ko.observableArray([]);
        self.quoteCountByQuarter = ko.observableArray([]);

        self.activate = function () {

            var payload = {
                url: "salesreport",
                method: "GET",
                data: {},
                success: function (response) {

                    if (response.success) {
                        var report = response.data;

                        // ORDERS
                        self.currentYearOrdersTotal(report.CurrentYearOrdersTotal);

                        var mapped = $.map(report.salesTotalByYears, function(year) {
                            return year;
                        });

                        self.salesTotalByYears(mapped);

                        var mapped = $.map(report.salesByQuarter, function(year) {

                            return year;
                        });

                        self.salesByQuarter(mapped);

                        var mapped = $.map(report.averageByQuarter, function(year) {

                            return year;
                        });

                        self.averageByQuarter(mapped);


                        var mapped = $.map(report.salesByMonth, function(year) {

                            return year;
                        });

                        self.salesByMonth(mapped);


                        var mapped = $.map(report.salesCountByQuarter, function(year) {

                            return year;
                        });

                        self.salesCountByQuarter(mapped);


                        // self.CurrentYearQuotesTotal(report.CurrentYearQuotesTotal);

                        // var mapped = $.map(report.quotesTotalByYears, function(year) {
                        //     return year;
                        // });

                        // self.quotesTotalByYears(mapped);

                        // var mapped = $.map(report.quotesByQuarter, function(year) {

                        //     return year;
                        // });

                        // self.quotesByQuarter(mapped);

                        // var mapped = $.map(report.averageQuotesByQuarter, function(year) {

                        //     return year;
                        // });

                        // self.averageQuotesByQuarter(mapped);


                        // var mapped = $.map(report.quotesByMonth, function(year) {

                        //     return year;
                        // });

                        // self.quotesByMonth(mapped);


                        // var mapped = $.map(report.quoteCountByQuarter, function(year) {

                        //     return year;
                        // });

                        // self.quoteCountByQuarter(mapped);



                    } else {
                        console.log(response);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            }

            account.ajax(payload);



            return true;
        };


    };

    return ctor;
});
