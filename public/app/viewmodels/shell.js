define(['plugins/router', 'durandal/app', 'account/account'], function (router, app, account) {
    return {
        router: router,
        activate: function () {
            window.router = router;
            router.map([
                { route: ['', 'companies'], title: 'Companies', moduleId: 'company/companylist', nav: true, hash: '#companies' },
                { route: 'companydetail(/:id)', title: 'Companies', moduleId: 'company/companydetail', hash: '#companydetail' },
                { route: 'reportdetail(/:id)', title: 'Reports', moduleId: 'company/reportdetail', hash: '#reportdetail' },
                { route: 'orderdetail(/:id)', title: 'Order Details', moduleId: 'order/orderdetail', hash: '#orderdetail' },
                { route: 'orderlist(/:id)', title: 'Order List', moduleId: 'order/orderlist', hash: '#orderlist' },
                { route: 'quotelist(/:id)', title: 'Quote List', moduleId: 'quote/quotelist', hash: '#quotelist' },
                { route: 'quotedetail(/:id)', title: 'Quote Details', moduleId: 'quote/quotedetail', hash: '#quotedetail' },
                { route: 'account', moduleId: 'account/account', hash: '#account' },
            ]).buildNavigationModel();
            
            account.checkCookies(account);


            return router.activate();
        },
        account: account
    };
});
