
define(function () {

    var QuoteItem = function (data) {

        var self = this;
        self.HeaderQuote_ID = ko.observable(data.HeaderQuote_ID);

        self.DetailItemCode = ko.observable(data.DetailItemCode);
        self.DetailInventoryCategory = ko.observable(data.DetailInventoryCategory);
        self.DetailItemDescription = ko.observable(data.DetailItemDescription);
        self.DetailInventoryDescription = ko.observable(data.DetailInventoryDescription);
        self.DetailPcs = ko.observable(data.DetailPcs);
        self.DetailLength = ko.observable(data.DetailLength);
        self.DetailQtyOrder = ko.observable(data.DetailQtyOrder);
        self.DetailExtendedPrice = ko.observable(data.DetailExtendedPrice);
        self.DetailItemCost = ko.observable(data.DetailItemCost);
        self.DetailMargin = ko.observable(data.DetailMargin);

    }
    return QuoteItem;
});
