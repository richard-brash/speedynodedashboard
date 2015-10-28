define(['plugins/router', 'account/account', 'company/Company'], function (router, account, Company) {
    var ctor = function () {
        var self = this;
        self.companies = ko.observableArray([]);
        self.currentPage = ko.observable(1);
        self.itemsToGet = ko.observable(20);
        self.filterText = ko.observable("");

        self.canActivate = function () {
            self.viewUrl = "company/companylist.html";
            if (!account.validated()) {
                account.returnUrl('#' + router.activeInstruction().fragment)
                router.navigate("#account");
                return false;
            } else {
                return true;
            }
        };

        $('html').bind('keypress', function (e) {
            if (e.keyCode == 13) {
                var activeRoute = router.activeInstruction().config.hash;
                if (activeRoute == "#companies") {
                    self.getCompanies();
                }
                return false;
            }
        });

        self.activate = function () {
            //self.getCompanies();
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

            var data = {
                skip: currentPage,
                take: itemsToGet,
                filters: ko.toJSON([{ field: "Company", value: self.filterText() + "%" }])
            }

            var payload = {
                url: "company",
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
