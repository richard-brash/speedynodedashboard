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
        self.itemsToGet = ko.observable(15);
        // self.toplimit = ko.observable("20");
        // self.toplimits = ko.observableArray([
        //     10,25,50,100,200,300,400,500
        // ]);

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
            self.getCompanies();
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

        self.seeCompany = function (speedy_id) {

            router.navigate('#reportdetail/' + speedy_id);

        }

        self.getCompanies = function () {

            self.companies([]);
            var currentPage = self.currentPage();
            var itemsToGet = self.itemsToGet();
            var skip = (currentPage - 1) * itemsToGet;

            var data = {
                top: itemsToGet * currentPage
            }

            var payload = {
                url: "systemreport/topcustomers",
                method: "GET",
                data: data,
                success: function (response) {
                    if (response.success) {
                        var itemCount = response.data.length;

                        var skipped = 0;
                        var mapped = $.map(response.data, function (company) {

                            if (skipped >= skip) {
                                var tc = new TopCompany({
                                    Speedy_Id: company.HeaderCustomer_ID,
                                    Company: company.HeaderCompanyName,
                                    LastYear: company.TotalSales
                                });
                                tc.init();
                                self.companies.push(tc);

                            } else {
                                skipped++;
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
