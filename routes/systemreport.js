/**
 * Created by richardbrash on 10/21/15.
 */
var express = require('express');
var router = express.Router();
var auth = require("../lib/authenticate");
var Config = require('../config');
var moment = require('moment');

var rbmJSONResponse = require("../lib/rbmJSONResponse");
var MSSQLReader = require('../lib/mssqlreader');
var InfusionsoftApiClient = require('../lib/InfusionsoftApiClient');

router.param('id', function(req, res, next, id){

    req.id = parseInt(id);
    next();

});

router.param('type', function(req, res, next, type){

    req.type = type;
    next();

});

router.param('tablename', function(req, res, next, tablename){

    req.tablename = tablename;
    next();

});

router.param('speedy', function(req, res, next, speedy){

    req.speedy = speedy;
    next();

});


router.param('appname', function(req, res, next, appname){

    req.appname = appname;
    next();

});


router.get('/', function(req,res){

    res.json({response:"here"});

})

router.get('/topcustomers', auth.isValidate, function(req, res) {
//router.get('/topcustomers', function(req, res) {    

    var config = Config.ISConfig(req.user.appname);
    var params = require('url').parse(req.url,true).query;

    var firstOfYear = moment().format("01/01/YYYY");
    var firstOfLastYear = moment().subtract(1, 'years').format("01/01/YYYY");

    var msreader = new MSSQLReader(config.mssql.username, config.mssql.password, config.mssql.server);
    var sql = "SELECT TOP " + params.toplimit + " HeaderCompanyName, HeaderCustomer_ID, SUM(DetailExtendedPrice) as TotalSales " +    
        "FROM  vw_CRMAllOrders " +
        "WHERE HeaderOrderDate >= '" + firstOfLastYear + "' AND HeaderOrderDate > '" + firstOfYear + "'"
       +  "GROUP BY HeaderCompanyName, HeaderCustomer_ID ORDER BY TotalSales DESC";
    msreader.executeQuery(sql,         
        function(error, records){

            if(error) {                
                res.json(rbmJSONResponse.errorResponse(error));
            } else {
                res.json(rbmJSONResponse.successResponse(records));                
            }

        });

});

router.get('/topcities', auth.isValidate, function(req, res) {
//router.get('/topcities', function(req, res) {    

    var config = Config.ISConfig(req.user.appname);
    var params = require('url').parse(req.url,true).query;

    var msreader = new MSSQLReader(config.mssql.username, config.mssql.password, config.mssql.server);

    // var sql = "SELECT * FROM information_schema.tables WHERE TABLE_NAME like 'tbl%' AND TABLE_TYPE='BASE TABLE'";
    // var sql = "SELECT TOP 25 * FROM tblCustomerAddress";
    // var sql = "SELECT  * FROM tblAddressType";

    
    var sql = "SELECT TOP " + params.toplimit + " tblCustomerAddress.city, SUM(DetailExtendedPrice) as TotalSales " +
    "FROM vw_CRMAllOrders JOIN tblCustomerAddress ON tblCustomerAddress.customer_id = " + 
    "vw_CRMAllOrders.HeaderCustomer_ID GROUP BY tblCustomerAddress.city ORDER BY TotalSales DESC"

    // var sql = "SELECT TOP " + params.toplimit + " HeaderCompanyName, HeaderCustomer_ID, SUM(DetailExtendedPrice) as TotalSales " +    
    //     "FROM  vw_CRMAllOrders " 
    //    +  "GROUP BY HeaderCompanyName, HeaderCustomer_ID ORDER BY TotalSales DESC";
    msreader.executeQuery(sql,         
        function(error, records){

            if(error) {                
                res.json(rbmJSONResponse.errorResponse(error));
            } else {
                res.json(rbmJSONResponse.successResponse(records));                
            }

        });

});

module.exports = router;

