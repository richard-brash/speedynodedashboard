define(['plugins/router', 'account/account', 'order/order'], function (router, account, Order) {
    var ctor = function () {

        var self = this;

        self.order = ko.observable();

        self.canActivate = function () {

            self.viewUrl = "order/orderdetail.html";
            if (!account.validated()) {
                account.returnUrl('#' + router.activeInstruction().fragment);
                router.navigate("#account");
                return false;
            } else {
                return true;
            }
        };

        self.activate = function (orderId) {

            if (orderId != undefined && orderId != null && orderId > 0) {

                account.ajax({
                    url: "order/" + orderId,
                    method: "GET",
                    data: {},
                    success: function (response) {

                        if (response.success) {

                            if(response.data.length > 0){
                                self.order(new Order(response.data[0]));
                            }


                        } else {
                            alert(response.message);
                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(common.MessageType.OppsError);
                    }
                });
            }
        };



    }
    return ctor;
});
