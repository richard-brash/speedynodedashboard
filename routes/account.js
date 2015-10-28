/**
 * Created by richardbrash on 10/21/15.
 */
var express = require('express');
var router = express.Router();
var auth = require("../lib/authenticate");
var rbmJSONResponse = require("../lib/rbmJSONResponse");
var InfusionsoftApiClient = require('../lib/InfusionsoftApiClient');


/* GET home page. */
router.get('/validate', auth.isValidate, function(req, res) {


    res.json(rbmJSONResponse.successResponse(req.user));


    //var username = req.query["username"];
    //var password = req.query["password"];
    //var appname = req.query["appname"];
    //
    //
    //var query = {
    //    Username: username,
    //    Password: password
    //
    //}
    //
    //InfusionsoftApiClient.Caller(appname, "DataService.query", ["Contact",1,0,query,["Id", "FirstName", "LastName", "Email"]], function(error, data){
    //
    //    if(error){
    //        res.json(rbmJSONResponse.errorResponse(error));
    //    } else {
    //
    //        if(data && data.length == 1){
    //
    //            var user = data[0];
    //
    //
    //        } else {
    //            res.json(rbmJSONResponse.errorResponse({Message:"Unauthorized"}));
    //        }
    //
    //
    //    }
    //})

});

module.exports = router;

