define(function () {


    var orders = ko.observableArray();
    var quotes = ko.observableArray();
    var addOrders = function (data) {
        orders(data);
    };
    var addQuotes = function (data) {
        quotes(data);
    };
    return {
        orders: orders,
        quotes: quotes,
        addOrders: addOrders,
        addQuotes: addQuotes
    };
});