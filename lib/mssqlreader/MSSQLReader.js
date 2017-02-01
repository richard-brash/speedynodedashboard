/**
 * Created with JetBrains WebStorm.
 * User: richard
 * Date: 11/14/13
 * Time: 9:19 AM
 * To change this template use File | Settings | File Templates.
 */

var objectMapper = require("../objectmapper");
var Connection = require('../../node_modules/tedious').Connection;
var Request = require('../../node_modules/tedious').Request;

function MSSQLReader(username, password, server){

    var self = this;

    self.config = {
        userName: username,
        password: password,
        server: server
    };

}

MSSQLReader.prototype.getStructure = function(tableName, callback){

    var query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + tableName + "'";

    var connection = new Connection(this.config);

    connection.on('connect', function(err){
        if(err)
            throw new Error("Could not connect: ", err);


        var records = [];
        request = new Request(query, function(err, rowCount) {

            if (err) {
                console.log(err);

            } else {
                console.log(rowCount + ' rows');
            }

            connection.close();
            callback(err, records);

        });

        request.on('row', function(columns) {

            var record = {};

            columns.forEach(function(column) {

//                {source:"customer_id", target:"_SpeedyId0"},
//                "COLUMN_NAME": "HeaderOrder_ID"
                record = {source:column.value, target:column.value};
//                record[column.metadata.colName] = column.value;
            });

            records.push(record);
        });


        connection.execSql(request);

    });


};


MSSQLReader.prototype.getDISTINCTRecords = function(tableName, mappings, conditions, orderby, callback){


    var mapper = new objectMapper(mappings);
    var query = "SELECT DISTINCT " + getFieldsFromMappings(mappings) + " FROM " + tableName + getWhereFromConditions(conditions) + orderby;

    console.log(query);
    var connection = new Connection(this.config);
    connection.on('connect', function(err){
        if(err)
            throw new Error("Could not connect: ", err);


        var records = [];
        request = new Request(query, function(err, rowCount) {

            if (err) {
                console.log(err);

            } else {
                console.log(rowCount + ' rows');
            }

            connection.close();
            callback(err, records);

        });

        request.on('row', function(columns) {

            var record = {};

            columns.forEach(function(column) {
                record[column.metadata.colName] = column.value;
            });

            records.push(mapper.map(record));
        });


        connection.execSql(request);

    });

};

MSSQLReader.prototype.executeQuery = function(query, callback){

    //console.log(query);
    var connection = new Connection(this.config);
    connection.on('connect', function(err){
        if(err)
            throw new Error("Could not connect: ", err);

        var records = [];
        request = new Request(query, function(err, rowCount) {

            if (err) {
                console.log(err);

            } else {
                console.log(rowCount + ' rows');
            }

            connection.close();
            callback(err, records);

        });

        request.on('row', function(columns) {

            var record = {};

            columns.forEach(function(column) {
                record[column.metadata.colName] = column.value;
            });

            records.push(record);
        });


        connection.execSql(request);

    });

};

MSSQLReader.prototype.getRecords = function(tableName, mappings, conditions, orderby, callback){


    var mapper = new objectMapper(mappings);
    var query = "SELECT " + getFieldsFromMappings(mappings) + " FROM " + tableName + getWhereFromConditions(conditions) + orderby;

    console.log(query);
    var connection = new Connection(this.config);
    connection.on('connect', function(err){
        if(err)
            throw new Error("Could not connect: ", err);


        var records = [];
        request = new Request(query, function(err, rowCount) {

            if (err) {
                console.log(err);

            } else {
                console.log(rowCount + ' rows');
            }

            connection.close();
            callback(err, records);

        });

        request.on('row', function(columns) {

            var record = {};

            columns.forEach(function(column) {
                record[column.metadata.colName] = column.value;
            });

            records.push(mapper.map(record));
        });


        connection.execSql(request);

    });

};


var parseCondition = function(condition){

    var result = "";
    for(var c in condition){
        result += getOperator(c) + " '" + condition[c] + "'";
    }
    return result;

};

var getOperator = function(input){
    var output = "";

    switch(input){
        case "$eq":
            output = "=";
            break;
        case "$lt":
            output = "<";
            break;
        case "$gt":
            output = ">";
            break;
        case "$gte":
            output = ">=";
            break;
        case "$lte":
            output = "<=";
            break;
        case "$like":
            output = "like";
            break;
        case "$ne":
            output = "<>";
            break;
    }

    return output

};

var getFieldsObjectFromMappings = function(mappings){

    var fields = {};

    mappings.forEach(function(mapping){
        fields[mapping.source] = 1;
    });

    return fields;
};

var getFieldsFromMappings = function(mappings){

    var fields = "";

    mappings.forEach(function(mapping){
        fields +=  mapping.source + ", ";
    });

    fields = fields.substring(0, fields.length - 2);

    return fields;
};

var getWhereFromConditions = function(conditions){

    var where = "";

    if(conditions){
        where += " WHERE "


        for(var condition in conditions){
            where +=  condition + " " + parseCondition(conditions[condition]) + " AND ";
        }


        where = where.substring(0, where.length - 4);

    }

    return where;
};


exports = module.exports = MSSQLReader;