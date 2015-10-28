define(['plugins/router', 'account/account', 'company/Company'], function (router, account, Company) {
    var ctor = function () {
        var self = this;

        self.canActivate = function () {

            self.viewUrl = "company/companydetail.html";
            if (!account.validated()) {
                account.returnUrl('#' + router.activeInstruction().fragment);
                router.navigate("#account");
                return false;
            } else {
                return true;
            }
        };

        self.activate = function (companyId) {

            if (companyId != undefined && companyId != null && companyId > 0) {
                account.ajax({
                    url: "company/" + companyId,
                    method: "get",
                    success: function (response) {

                        if (response.success) {

                            self.companyDetail(new Company(response.data));

                        } else {
                            console.log(response);
                        }
                    }
                });
            }


        };

        self.companyDetail = ko.observable();



    }
    return ctor;
});
