define(['plugins/router', 'durandal/app', 'account/account', 'quote/quoteitem'], function (router, app, account, QuoteItem) {
    var ctor = function () {
        var self = this;
        self.quoteItems = ko.observableArray([]);

        self.canActivate = function () {
            self.viewUrl = "quote/quoteitemlist.html";
            if (!account.validated()) {
                account.returnUrl("#quoteitemlist")
                router.navigate("#account");
                return false;
            } else {
                return true;
            }
        };

        self.activate = function (quoteid) {

            if (quoteid != undefined && quoteid != null) {

                var payload = {
                    url: "quote/" + quoteid,
                    method: "GET",
                    data: {},

                    success: function (response) {

                        if (response.success) {
                            var mapped = $.map(response.data, function (item) {
                                return new QuoteItem(item);
                            });
                            self.quoteItems(mapped);
                        } else {
                            console.log(response.message);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                    }
                }

                account.ajax(payload);
            }

        };


    };

    return ctor;
});