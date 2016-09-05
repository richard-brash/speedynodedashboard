/**
 * Created by richardbrash on 10/21/15.
 */
var express = require('express');
var router = express.Router();
var auth = require("../lib/authenticate");
var Config = require('../config');

var rbmJSONResponse = require("../lib/rbmJSONResponse");
var MSSQLReader = require('../lib/mssqlreader');

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

    var mappings = Config.getTableMappingForTable("vw_CRMAllQuotes", config);
    res.json(rbmJSONResponse.successResponse(mappings));

    // var msreader = new MSSQLReader(config.mssql.username, config.mssql.password, config.mssql.server);

    // msreader.executeQuery("SELECT HeaderQuote_ID, HeaderCustomer_ID, HeaderOrderDate, SUM(DetailExtendedPrice) AS QuoteTotal FROM vw_CRMAllQuotes WHERE HeaderCustomer_ID = " + params.speedyid + " GROUP BY HeaderQuote_ID, HeaderCustomer_ID, HeaderOrderDate  ORDER BY HeaderQuote_ID  DESC",
    //     function(error, records){

    //         if(error) {
    //             res.json(rbmJSONResponse.errorResponse(error));
    //         } else {
    //             res.json(rbmJSONResponse.successResponse(records));
    //         }

    //     });

});

module.exports = router;

