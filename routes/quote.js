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


router.get('/:id', auth.isValidate, function(req, res) {

    var config = Config.ISConfig(req.user.appname);

    var mappings = Config.getTableMappingForTable("vw_CRMAllQuotes", config);

    var msreader = new MSSQLReader(config.mssql.username, config.mssql.password, config.mssql.server);

    msreader.getRecords(mappings.tableName, mappings.detailmappings, mappings.conditionsForDetail(req.id), mappings.orderby, function(error, records){

        if(error) {
            res.json(rbmJSONResponse.errorResponse(error));
        } else {

            res.json(rbmJSONResponse.successResponse(records));


        }

    });

});


router.get('/quotetotal/:appname/:id', function(req, res) {

    var config = Config.ISConfig(req.appname);

    var mappings = Config.getTableMappingForTable("vw_CRMAllQuotes", config);

    var msreader = new MSSQLReader(config.mssql.username, config.mssql.password, config.mssql.server);

    msreader.getRecords(mappings.tableName, mappings.detailmappings, {HeaderQuote_ID : { $eq : req.id }}, "", function(error, records){

        if(error) {
            res.json(rbmJSONResponse.errorResponse(error));
        } else {

            var response = 0;

            for(var i = 0; i < records.length; i++){
                response += records[i]["DetailExtendedPrice"];
            }

            res.json(rbmJSONResponse.successResponse(response));


        }

    });

});

router.get('/', auth.isValidate, function(req, res) {

    var config = Config.ISConfig(req.user.appname);
    var params = require('url').parse(req.url,true).query;

    var mappings = Config.getTableMappingForTable("vw_CRMAllQuotes", config);

    var msreader = new MSSQLReader(config.mssql.username, config.mssql.password, config.mssql.server);

    msreader.executeQuery("SELECT HeaderQuote_ID, HeaderCustomer_ID, HeaderOrderDate, SUM(DetailExtendedPrice) AS QuoteTotal FROM vw_CRMAllQuotes WHERE HeaderCustomer_ID = " + params.speedyid + " GROUP BY HeaderQuote_ID, HeaderCustomer_ID, HeaderOrderDate  ORDER BY HeaderQuote_ID  DESC",
        function(error, records){

            if(error) {
                res.json(rbmJSONResponse.errorResponse(error));
            } else {
                res.json(rbmJSONResponse.successResponse(records));
            }

        });

});


//router.get('/data/:appname/:speedy/:tablename', function(req, res) {
//
//
//    var config = Config.ISConfig(req.appname);
//    var mappings = Config.getTableMappingForTable(req.tablename, config);
//
//    var msreader = new MSSQLReader(config.mssql.username, config.mssql.password, config.mssql.server);
//
//    msreader.getRecords(mappings.tableName, mappings.mappings, mappings.conditions(req.speedy), function(error, records){
//
//        if(error) {
//            res.json(error);
//        } else {
//            res.json(records);
//        }
//
//    });
//
//
////vw_CRMAllOrders
////vw_CRMAllQuotes
////vw_CRMContact
////vw_CRMOrder
////vw_CRMQuote
//
//
//    //params.speedyid
//
//
//});
//router.get('/structure/:appname/:tablename', function(req, res) {
//
//
//    var config = Config.ISConfig(req.appname);
//
//    var msreader = new MSSQLReader(config.mssql.username, config.mssql.password, config.mssql.server);
//
//    msreader.getStructure(req.tablename, function(error, records){
//        if(error){
//            res.json(error);
//        }else {
//            res.json(records);
//        }
//    });
//
//
//});

module.exports = router;

