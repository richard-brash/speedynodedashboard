
var assert = require("assert");
var should = require('should');

var MSSQLReader = require('../MSSQLReader.js');
var config = require("./config.js");

var msreader = new MSSQLReader(config.mssql.username, config.mssql.password, config.mssql.server);

msreader.getRecords(config.tableName, config.mappings, config.conditions, function(error, records){

    if(error)
        console.log(error);

    console.log(config.tableName + " has " + records.length + " meeting the criteria.");

    records.forEach(function(record){
        console.log(record);
    });

});
