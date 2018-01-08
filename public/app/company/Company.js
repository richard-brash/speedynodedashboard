define(function () {

    var Company = function (data) {

        var self = this;
        self.Id = ko.observable(data.Id);
        self.City = ko.observable(data.City).extend({ required: { message: 'City is required' } });
        self.Company = ko.observable(data.Company).extend({ required: { message: 'Company is required' } });
        self.Email = ko.observable(data.Email).extend({ required: { message: 'Email is required' }, email: { message: 'Enter valid Email' } });
        self.Website = ko.observable(data.Website);
        self.Phone1 = ko.observable(data.Phone1).extend({ required: { message: 'Phone is required' } });
        self.Phone1Ext = ko.observable(data.Phone1Ext);
        self.StreetAddress1 = ko.observable(data.StreetAddress1).extend({ required: { message: 'Street Address is required' } });
        self.StreetAddress2 = ko.observable(data.StreetAddress2);
        self.State = ko.observable(data.State).extend({ required: { message: 'Please select State' } });
        self.PostalCode = ko.observable(data.PostalCode).extend({ required: { message: 'Postal Code is required' } });
        self.Country = ko.observable(data.Country).extend({ required: { message: 'Please select Country' } });
        self.SpeedyId =ko.observable(data._SpeedyId0);
        self.Zone = ko.observable(data._Zone);
    }
    return Company;
});
