/**
 * Created by richardbrash on 4/5/16.
 */


define(['plugins/router', 'account/account'], function (router, account) {
    var ctor = function () {
        var self = this;

        self.cities = ko.observableArray([]);
        self.currentPage = ko.observable(1);
        self.itemsToGet = ko.observable(20);
        self.toplimit = ko.observable("10");
        self.toplimits = ko.observableArray([
            10,25,50,100,200,300,400,500
        ]);

        self.canActivate = function () {
           self.viewUrl = "reports/topcities.html";
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
            self.getCities();

            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();

        };

        self.moveNext = function (e) {

            if (self.cities().length >= self.itemsToGet()) {
                var currentPage = self.currentPage();
                currentPage++;
                self.currentPage(currentPage);
                self.getCities();
            }

            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();

        };


        self.getCities = function () {
            // self.companies([]);
            self.cities.removeAll();
            var currentPage = self.currentPage();
            var itemsToGet = self.itemsToGet();
            var toplimit = self.toplimit();

            var data = {
                skip: currentPage,
                take: itemsToGet,
                toplimit: toplimit
            }

            var payload = {
                url: "systemreport/topcities",
                method: "GET",
                data: data,
                success: function (response) {
                    if (response.success) {
                        var itemCount = response.data.length;
                        var mapCount = 0;
                        var mapped = $.map(response.data, function (item) {

                            var map = {
                                City: item.city,
                                TotalSales: item.TotalSales
                            }
                            self.cities.push(map); 


                            mapCount++;
                            if(mapCount == itemCount){
                                self.cities.sort(function (left, right) { 
                                    return left.TotalSales == right.TotalSales ? 0 : (left.TotalSales > right.TotalSales ? -1 : 1) 
                                });                                        
                            }
 
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
