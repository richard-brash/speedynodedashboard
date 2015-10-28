define(['account/account', 'knockout', 'plugins/router'], function (account, ko, router) {

    var accountMenu = function () {

        var self = this;

        self.menuText = ko.computed(function () {

            if (account.validated()) {
                return "Logged in as " + account.firstName() + " " + account.lastName();
            } else {
                return "Log In";
            }
        })

    }

    return accountMenu;
});