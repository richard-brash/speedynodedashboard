/**
 * Created by richardbrash on 10/21/15.
 */

define(['plugins/router', 'knockout'], function (router, ko) {

    var Common = function () {

        var self = this;

        ko.bindingHandlers.foreachprop = {
            transformObject: function (obj) {
                var properties = [];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        properties.push({ key: key, value: obj[key] });
                    }
                }
                return properties;
            },
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var value = ko.utils.unwrapObservable(valueAccessor()),
                    properties = ko.bindingHandlers.foreachprop.transformObject(value);
                ko.applyBindingsToNode(element, { foreach: properties }, bindingContext);
                return { controlsDescendantBindings: true };
            }
        };

        (function () {

            var toMoney = function (num) {

                if (typeof (num) == "undefined" || num == null) {
                    num = 0;
                    return '$' + (num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                } else {
                    return '$' + (num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                }

            };

            var moneyhandler = function (element, valueAccessor, allBindings) {
                var $el = $(element);
                var method;

                // Gives us the real value if it is a computed observable or not
                var valueUnwrapped = ko.unwrap(valueAccessor());

                if ($el.is(':input')) {
                    method = 'val';
                } else {
                    method = 'text';
                }
                return $el[method](toMoney(valueUnwrapped));
            };

            ko.bindingHandlers.money = {
                update: moneyhandler
            };



            var formatPercentage = function(value, precision) {
                return (value < 0 ? "-" : "") + Math.abs(value).toFixed(precision) + "%";
            }

            var rawNumber = function(val) {
                return Number(val.replace(/[^\d\.\-]/g, ""));
            }

            ko.bindingHandlers.percentage = {
                precision: ko.observable(2),
                init: function (element, valueAccessor, allBindingsAccessor) {
                    //only inputs need this, text values don't write back
                    if ($(element).is("input") === true) {
                        var underlyingObservable = valueAccessor(),
                            interceptor = ko.computed({
                                read: underlyingObservable,
                                write: function (value) {
                                    if (value === "") {
                                        underlyingObservable(null);
                                    } else {
                                        underlyingObservable(rawNumber(value));
                                    }
                                }
                            });
                        ko.bindingHandlers.value.init(element, function () {
                            return interceptor;
                        }, allBindingsAccessor);
                    }
                },
                update: function (element, valueAccessor, allBindingsAccessor) {
                    var precision = ko.unwrap(allBindingsAccessor().precision !== undefined ? allBindingsAccessor().precision : ko.bindingHandlers.percentage.precision),
                        value = ko.unwrap(valueAccessor());
                    if ($(element).is("input") === true) {
                        //leave the boxes empty by default
                        value = value !== null && value !== undefined && value !== "" ? formatPercentage(parseFloat(value), precision) : "";
                        $(element).val(value);
                    } else {
                        //text based bindings its nice to see a 0 in place of nothing
                        value = value || 0;
                        $(element).text(formatPercentage(parseFloat(value), precision));
                    }
                }
            };


        })();

    }
    return new Common;

});


