define(['plugins/router', 'account/account', 'quote/quote'], function (router, account, Quote) {
    var ctor = function () {

        var self = this;

        self.quote = ko.observable();

        self.canActivate = function () {

            self.viewUrl = "quote/quotedetail.html";
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
                    url: "quote/" + orderId,
                    method: "GET",
                    data: {},
                    success: function (response) {

                        if (response.success) {

                            if(response.data.length > 0){
                                self.quote(new Quote(response.data[0]));
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
