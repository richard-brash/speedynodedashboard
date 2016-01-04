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
            init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var value = ko.utils.unwrapObservable(valueAccessor()),
                    properties = ko.bindingHandlers.foreachprop.transformObject(value);
                ko.applyBindingsToNode(element, { foreach: properties }, bindingContext);
                return { controlsDescendantBindings: true };
            }
        };

        (function(){

            var toMoney = function(num){

                if(typeof(num) == "undefined" || num == null){
                    num = 0;
                    return '$' + (num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') );
                } else{
                    return '$' + (num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') );
                }

            };

            var handler = function(element, valueAccessor, allBindings){
                var $el = $(element);
                var method;

                // Gives us the real value if it is a computed observable or not
                var valueUnwrapped = ko.unwrap( valueAccessor() );

                if($el.is(':input')){
                    method = 'val';
                } else {
                    method = 'text';
                }
                return $el[method]( toMoney( valueUnwrapped ) );
            };

            ko.bindingHandlers.money = {
                update: handler
            };
        })();

    }
    return new Common;

});


