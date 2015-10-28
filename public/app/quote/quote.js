define(['account/account'],function (account) {

    var Quote = function (data) {

        var self = this;
        self.QuoteTotal = ko.observable(data.QuoteTotal);

        self.HeaderQuote_ID = ko.observable(data.HeaderQuote_ID);
        self.HeaderCompanyName = ko.observable(data.HeaderCompanyName);
        self.HeaderCustomer_ID = ko.observable(data.HeaderCustomer_ID);
        self.CRMCompanyID = ko.observable(data.CRMCompanyID);
        self.CRMContactID = ko.observable(data.CRMContactID);
        self.HeaderOrderDate = ko.observable(data.HeaderOrderDate);
        self.HeaderContact = ko.observable(data.HeaderContact);
        self.HeaderPaymentMethod = ko.observable(data.HeaderPaymentMethod);
        self.SalesmanID = ko.observable(data.SalesmanID);
        self.ShipVia = ko.observable(data.ShipVia);


    }
    return Quote;


});
