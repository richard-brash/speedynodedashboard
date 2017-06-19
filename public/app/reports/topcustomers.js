/**
 * Created by richardbrash on 4/5/16.
 */

topCompany = {

}

define(['plugins/router', 'account/account', 'company/Company', 'reports/topCompany'], function (router, account, Company, TopCompany) {    
    var ctor = function () {
        var self = this;

        self.companies = ko.observableArray([]);
        self.currentPage = ko.observable(1);
        self.itemsToGet = ko.observable(20);
        self.toplimit = ko.observable("10");
        self.toplimits = ko.observableArray([
            10,25,50,100,200,300,400,500
        ]);

        self.canActivate = function () {
        
           self.viewUrl = "reports/topcustomers.html";
           if (!account.validated()) {
               account.returnUrl('#' + router.activeInstruction().fragment)
               router.navigate("#account");
               return false;
           } else {
        
               return true;
           }
        };

        self.activate = function () {
           
        };

        self.resetPage = function () {
            // Fires when filterText changes
            self.currentPage(1);
        }

        self.movePrevious = function (e) {

            var currentPage = self.currentPage();
            var newCurrent = currentPage - 1;
            newCurrent = (newCurrent < 1) ? 1 : newCurrent;

            self.currentPage(newCurrent);
            self.getCompanies();

            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();

        };

        self.moveNext = function (e) {

            if (self.companies().length >= self.itemsToGet()) {
                var currentPage = self.currentPage();
                currentPage++;
                self.currentPage(currentPage);
                self.getCompanies();
            }

            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();

        };

        self.seeCompany = function(speedy_id){

            router.navigate('#reportdetail/' + speedy_id);

        }

        self.getCompanies = function () {
            
            var currentPage = self.currentPage();
            var itemsToGet = self.itemsToGet();
            var toplimit = self.toplimit();

            var data = {
                skip: currentPage,
                take: itemsToGet,
                toplimit: toplimit
            }

            var payload = {
                url: "systemreport/topcustomers",
                method: "GET",
                data: data,
                success: function (response) {
                    if (response.success) {
                        var itemCount = response.data.length;
                        var mapCount = 0;
                        var mapped = $.map(response.data, function (company) {

                        var tc = new TopCompany({
                            Speedy_Id       : company.HeaderCustomer_ID,
                            Company         : company.HeaderCompanyName,
                        });
                        tc.init();
                        self.companies.push(tc);
                                                    
                        // mapCount++;
                        // if(mapCount == itemCount){
                        //     self.companies.sort(function (left, right) { 
                        //         return left.TotalSales == right.TotalSales ? 0 : (left.TotalSales > right.TotalSales ? -1 : 1) 
                        //     });                                        
                        // }


//COMPANY {{ % DIFF for 3 month rolling }} {{[2016 TOTAL]}} {{[JAN-MAY 2017] [JAN-MAY 2016]}} 	{{[MAR, APR, MAY 2017]}} 	{{2016/4}}
                        // var payload = {
                        //     url: "report/" + company.HeaderCustomer_ID,
                        //     method: "GET",
                        //     data: {},
                        //     success: function (response) {

                        //         if (response.success) {
                        //             var report = response.data;
                        //             console.log(report);

                        //             var map = {
                        //                 Speedy_Id       : company.HeaderCustomer_ID,
                        //                 Company         : company.HeaderCompanyName,
                        //                 Diff            : .4,
                        //                 PreviousYear    : report.salesTotalByYears[1].Total,
                        //                 ThisYTD             : company.TotalSales,
                        //             }

                                     


                        //             // ORDERS
                        //             self.currentYearOrdersTotal(report.CurrentYearOrdersTotal);

                        //             var mapped = $.map(report.salesTotalByYears, function(year) {
                        //                 return year;
                        //             });

                        //             self.salesTotalByYears(mapped);

                        //             var mapped = $.map(report.salesByQuarter, function(year) {
                        //                 return year;
                        //             });

                        //             self.salesByQuarter(mapped);

                        //             var mapped = $.map(report.averageByQuarter, function(year) {

                        //                 return year;
                        //             });

                        //             self.averageByQuarter(mapped);


                        //             var mapped = $.map(report.salesByMonth, function(year) {

                        //                 return year;
                        //             });

                        //             self.salesByMonth(mapped);


                        //             var mapped = $.map(report.salesCountByQuarter, function(year) {

                        //                 return year;
                        //             });

                        //             self.salesCountByQuarter(mapped);



                        //         } else {
                        //             console.log(response);
                        //         }
                        //     },
                        //     error: function (jqXHR, textStatus, errorThrown) {
                        //         console.log(jqXHR);
                        //     }
                        // }

                        // account.ajax(payload);


                        });

                    } else {
                        console.log(response);
                    }
                }
            }

            account.ajax(payload);
        };


    }
    return ctor;
});
