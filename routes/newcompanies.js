/**
 * Created by richardbrash on 02/01/17.
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

router.get('/', auth.isValidate, function(req,res){

    var config = Config.ISConfig(req.user.appname);
    var params = require('url').parse(req.url,true).query;    
    var msreader = new MSSQLReader(config.mssql.username, config.mssql.password, config.mssql.server);

    var sql = "SELECT TOP " + params.toplimit + " " +
    "tblCustomer.customer_id, " +
    "tblCustomer.company_name,  " +
    "tblCustomerAddress.Company_Name,  " +
    "tblCustomerAddress.city, " +
    "tblCustomer.cust_enter_date " +
    "from tblCustomer " +
    "JOIN  tblCustomerAddress ON tblCustomer.customer_id = tblCustomerAddress.customer_id " +
    "WHERE tblCustomerAddress.state = 'MI' " +
    "ORDER BY tblCustomer.cust_enter_date DESC"

    // var sql = "SELECT TOP 10 * " +
    // "FROM  tblCustomerAddress"


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
