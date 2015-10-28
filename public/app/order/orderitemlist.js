define(['plugins/router', 'durandal/app', 'account/account', 'order/orderitem'], function (router, app, account, OrderItem) {
    var ctor = function () {
        var self = this;
        self.orderItems = ko.observableArray([]);

        self.canActivate = function () {
            self.viewUrl = "order/orderitemlist.html";
            if (!account.validated()) {
                account.returnUrl("#orderitemlist")
                router.navigate("#account");
                return false;
            } else {
                return true;
            }
        };

        self.activate = function (orderId) {

            if (orderId != undefined && orderId != null) {

                var payload = {
                    url: "order/" + orderId,
                    method: "GET",
                    data: {},

                    success: function (response) {

                        if (response.success) {
                            var mapped = $.map(response.data, function (item) {
                                return new OrderItem(item);
                            });
                            self.orderItems(mapped);
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