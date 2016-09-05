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
            { route: 'report2', moduleId: 'report2', title: 'Report Two', nav: true, hash:'#reports/report2'},
            { route: 'report3', moduleId: 'report3', title: 'Report Three', nav: true, hash:'#reports/report3'}
        ]).buildNavigationModel();

    return {
        router: childRouter //the property on the view model should be called router
    };
});