/**
 * Created by richardbrash on 4/5/16.
 */
define(['plugins/router', 'knockout'], function(router, ko) {

    var childRouter = router
        .createChildRouter()
        .makeRelative({ moduleId: 'reports', fromParent: true })
        .map([
            { route: '', moduleId: 'report1', title: 'Report One', nav: false},
            { route: 'topcustomers', moduleId: 'topcustomers', title: 'Top Customers', nav: true, hash:'#reports/topcustomers'},
            { route: 'topcities', moduleId: 'topcities', title: 'Top Cities', nav: true, hash:'#reports/topcities'},
            { route: 'salesreport', moduleId: 'salesreport', title: 'Sales Report', nav: true, hash:'#reports/salesreport'}
        ]).buildNavigationModel();

    return {
        router: childRouter //the property on the view model should be called router
    };
});