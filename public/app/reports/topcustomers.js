/**
 * Created by richardbrash on 4/5/16.
 */
define(['plugins/router', 'account/account', 'company/Company'], function (router, account, Company) {    
    var ctor = function () {
        var self = this;

        self.companies = ko.observableArray([]);
        self.currentPage = ko.observable(1);
        self.itemsToGet = ko.observable(20);
        self.toplimit = ko.observable("100");
        self.toplimits = ko.observableArray([
            100,200,300,400,500
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

                        var mapped = $.map(response.data, function (item) {
                            return new Company(item);
                        });

                        self.companies(mapped);

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
