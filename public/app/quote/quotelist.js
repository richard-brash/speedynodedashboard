define(['plugins/router', 'durandal/app', 'account/account', 'quote/quote','viewmodels/common' ], function (router, app, account, Quote,common) {
    var ctor = function () {
        var self = this;
        self.companyId = ko.observable();
        self.quotes = ko.observableArray([]);

        self.canActivate = function () {
            self.viewUrl = "quote/quotelist.html";
            if (!account.validated()) {
                account.returnUrl("#contactlist")
                router.navigate("#account");
                return false;
            } else {
                return true;
            }
        };

        self.activate = function (companyId) {

            if (companyId != undefined && companyId != null) {
                self.companyId(companyId);
                self.getQuotes(companyId);
            }
            
        };

        self.getQuotes = function (speedyid) {
            var payload = {
                url: "quote",
                method: "GET",
                data: ko.toJS({ speedyid: speedyid }),
                success: function (response) {

                    if (response.success) {


                        var mapped = $.map(response.data, function (item) {

                            return new Quote(item);

                        });
                        self.quotes(mapped);


                    } else {
                        console.log(response);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            }

            account.ajax(payload);

        };

    };

    return ctor;
});
