define(function () {

    var Order = function (data) {

        var self = this;

        self.HeaderOrder_ID = ko.observable(data.HeaderOrder_ID);
        self.HeaderCompanyName = ko.observable(data.HeaderCompanyName);
        self.HeaderCustomer_ID = ko.observable(data.HeaderCustomer_ID);
        self.CRMCompanyID = ko.observable(data.CRMCompanyID);
        self.CRMContactID = ko.observable(data.CRMContactID);
        self.HeaderOrderDate = ko.observable(data.HeaderOrderDate);
        self.HeaderContact = ko.observable(data.HeaderContact);
        self.HeaderOrderTotal = ko.observable(data.HeaderOrderTotal);
        self.HeaderQuoteNumber = ko.observable(data.HeaderQuoteNumber);
        self.HeaderCustomerPO = ko.observable(data.HeaderCustomerPO);
        self.HeaderPaymentMethod = ko.observable(data.HeaderPaymentMethod);
        self.QuoteSalesmanID = ko.observable(data.QuoteSalesmanID);
        self.OrderSalesmanID = ko.observable(data.OrderSalesmanID);
        self.ProcessSalesmanID = ko.observable(data.ProcessSalesmanID);
        self.ShipVia = ko.observable(data.ShipVia);


    }
    return Order;


});
