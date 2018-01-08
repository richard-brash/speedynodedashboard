requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-2.3.0',
        'knockoutvalidation': '../lib/knockout/knockout.validation.min',
        'knockoutorderable': '../lib/knockout/knockout.orderable',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'toastr': '../lib/toastr/toastr.min',
        'jquery': '../lib/jquery/jquery',
        'moment': '../lib/moment/moment',
        'orderable': '',
        'bootstrap-datepicker': '../lib/Datepicker-for-Bootstrap/bootstrap-datepicker',
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'bootstrap-datepicker': {
            deps: ['bootstrap'],
            exports: 'bootstrap'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'toastr', 'bootstrap-datepicker', 'knockout', 'knockoutvalidation', 'viewmodels/common'],
    function (system, app, viewLocator,toastr, bootstrapDatepicker, knockout, kovalidation, common) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Speedy Metals';

    window.ko = knockout;
    window.toastr = toastr;

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});