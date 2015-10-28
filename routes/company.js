/**
 * Created by richardbrash on 10/21/15.
 */
var express = require('express');
var router = express.Router();
var auth = require("../lib/authenticate");
var Config = require('../config');

var rbmJSONResponse = require("../lib/rbmJSONResponse");
var InfusionsoftApiClient = require('../lib/InfusionsoftApiClient');


router.param('id', function(req, res, next, id){

    req.cid = parseInt(id);
    next();

});



router.param('appname', function(req, res, next, appname){

    req.appname = appname;
    next();

});

router.get('/:id', auth.isValidate, function(req, res) {

    var config = Config.ISConfig(req.user.appname);

    InfusionsoftApiClient.Caller(req.user.appname, "DataService.load", ["Company",req.cid, config.CompanyModel
    ], function(error, data){

        if(error){
            res.json(rbmJSONResponse.errorResponse(error));
        } else {

            if(data){
                res.json(rbmJSONResponse.successResponse(data));
            }


        }
    })

});



router.get('/model/:appname', function(req, res) {

    var config = Config.ISConfig(req.appname);
    res.json(config.CompanyModel);

});

router.get('/', auth.isValidate, function(req, res) {

    var config = Config.ISConfig(req.user.appname);

    var params = require('url').parse(req.url,true).query;

    var filters  = JSON.parse(params.filters);
    var query = {};

    for(var i = 0; i < filters.length; i++ ){
        query[filters[i].field] = filters[i].value;
    }


    InfusionsoftApiClient.Caller(req.user.appname, "DataService.query", ["Company",parseInt(params.take), parseInt(params.skip) - 1, query, config.CompanyModel
    ], function(error, data){

        if(error){
            res.json(rbmJSONResponse.errorResponse(error));
        } else {

            if(data){
                res.json(rbmJSONResponse.successResponse(data));
            }


        }
    })

});

module.exports = router;

