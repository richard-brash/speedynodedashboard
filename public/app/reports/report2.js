/**
 * Created by richardbrash on 4/5/16.
 */
define(['plugins/router', 'account/account'], function (router, account) {
    var ctor = function () {
        var self = this;

        //self.canActivate = function () {
        //    self.viewUrl = "reports/report2.html";
        //    if (!account.validated()) {
        //        account.returnUrl('#' + router.activeInstruction().fragment)
        //        router.navigate("#account");
        //        return false;
        //    } else {
        //        return true;
        //    }
        //};

        //self.activate = function () {
        //
        //};


    }
    return ctor;
});
