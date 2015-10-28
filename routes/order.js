/**
 * Created by richardbrash on 10/21/15.
 */
var express = require('express');
var router = express.Router();
var auth = require("../lib/authenticate");
var Config = require('../config');
var async = require('async');
var moment = require('moment');

var rbmJSONResponse = require("../lib/rbmJSONResponse");
var MSSQLReader = require('../lib/mssqlreader');

router.param('id', function(req, res, next, id){

    req.id = parseInt(id);
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

    var mappings = Config.getTableMappingForTable("vw_CRMAllOrders", config);

    var msreader = new MSSQLReader(config.mssql.username, config.mssql.password, config.mssql.server);

    msreader.getRecords(mappings.tableName, mappings.detailmappings, mappings.conditionsForDetail(req.id), mappings.orderby, function(error, records){

        if(error) {
            res.json(rbmJSONResponse.errorResponse(error));
        } else {

            res.json(rbmJSONResponse.successResponse(records));


        }

    });

});


router.get('/', auth.isValidate, function(req, res) {

    var config = Config.ISConfig(req.user.appname);
    var params = require('url').parse(req.url,true).query;

    var mappings = Config.getTableMappingForTable("vw_CRMAllOrders", config);

    var msreader = new MSSQLReader(config.mssql.username, config.mssql.password, config.mssql.server);

    msreader.getDISTINCTRecords(mappings.tableName, mappings.listmappings, mappings.conditionsForList(params.speedyid), mappings.orderby, function(error, records){

        if(error) {
            res.json(rbmJSONResponse.errorResponse(error));
        } else {

            res.json(rbmJSONResponse.successResponse(records));


        }

    });

});

module.exports = router;

