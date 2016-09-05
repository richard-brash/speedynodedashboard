define(['plugins/router', 'durandal/app', 'account/account', 'order/order', 'viewmodels/common' ], function (router, app, account, Order,common) {
    var ctor = function () {
        var self = this;
        self.companyId = ko.observable();
        self.orders = ko.observableArray([]);

        self.canActivate = function () {
            self.viewUrl = "order/orderlist.html";
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
                self.getOrders(companyId);
            }
            
        };

        self.getOrders = function (speedyid) {
            var payload = {
                url: "order",
                method: "GET",
                data: ko.toJS({ speedyid: speedyid }),
                success: function (response) {

                    if (response.success) {


                        var mapped = $.map(response.data, function (item) {

                            return new Order(item);

                        });
                        self.orders(mapped);

                        //if (quotes) {
                        //    ordersviewmodel.addQuotes(mapped);
                        //} else {
                        //    ordersviewmodel.addOrders(mapped);
                        //}

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
