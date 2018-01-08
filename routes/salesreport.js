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
    var msreader = new MSSQLReader(config.mssql.username, config.mssql.password, config.mssql.server);

    var firstOfYear = moment().format("01/01/YYYY");
    var report = {};

    async.parallel([
            function(callback) {

                //  self.getCurrentYearOrdersTotal();
                msreader.executeQuery(
                    "SELECT SUM(DetailExtendedPrice) as OrderTotal " +
                    "FROM vw_CRMAllOrders " +
                    "WHERE " +
                    "HeaderOrderDate >= '" + firstOfYear + "'",
                    function(error, records){

                        if(error) {
                            callback(error);

                        } else {

                            report.CurrentYearOrdersTotal = records[0].OrderTotal;
                            callback();


                        }

                    });
            },
            function(callback) {
                report.salesTotalByYears = [];
                //            self.salesTotalByYears();
                msreader.executeQuery(
                    "SELECT SUM(DetailExtendedPrice) as OrderTotal, YEAR(HeaderOrderDate) AS Year " +
                    "FROM vw_CRMAllOrders " +
                    " GROUP BY YEAR(HeaderOrderDate) ORDER BY YEAR(HeaderOrderDate) DESC",
                    function(error, records){

                        if(error) {
                            callback(error);

                        } else {

                            for(var i=0 ; i<records.length; i++){
                                report.salesTotalByYears[i] = {Year:records[i].Year, Total:records[i].OrderTotal};
                            }


                            callback();
                        }

                    });



            },
            function(callback) {
                report.salesByQuarter = [];

                msreader.executeQuery(
                    "SELECT Year, QPivot.[1] As Q1, QPivot.[2] As Q2," +
                    "QPivot.[3] As Q3, QPivot.[4] As Q4 " +
                    "FROM (SELECT YEAR(HeaderOrderDate) [Year], " +
                    "DATEPART(QUARTER, HeaderOrderDate) [Quarter], " +
                    "SUM(DetailExtendedPrice) [DetailExtendedPrice SUM]" +
                    "FROM vw_CRMAllOrders " +
                    "GROUP BY YEAR(HeaderOrderDate), " +
                    "DATEPART(QUARTER,HeaderOrderDate)) AS QuarterlyData " +
                    "PIVOT( SUM([DetailExtendedPrice SUM])" +
                    "FOR QUARTER IN ([1],[2],[3],[4])) AS QPivot  ORDER BY Year DESC",
                    function(error, records){

                        if(error) {
                            callback(error);

                        } else {
                             report.salesByQuarter = records;
                            callback();
                        }

                    });

            },
            function(callback) {
                report.averageByQuarter = [];

                msreader.executeQuery(
                    "SELECT Year, QPivot.[1] As Q1, QPivot.[2] As Q2," +
                    "QPivot.[3] As Q3, QPivot.[4] As Q4 " +
                    "FROM (SELECT YEAR(HeaderOrderDate) [Year], " +
                    "DATEPART(QUARTER, HeaderOrderDate) [Quarter], " +
                    "AVG(DetailExtendedPrice) [DetailExtendedPrice AVG]" +
                    "FROM vw_CRMAllOrders " +
                    "GROUP BY YEAR(HeaderOrderDate), " +
                    "DATEPART(QUARTER,HeaderOrderDate)) AS QuarterlyData " +
                    "PIVOT( AVG([DetailExtendedPrice AVG])" +
                    "FOR QUARTER IN ([1],[2],[3],[4])) AS QPivot   ORDER BY Year DESC",
                    function(error, records){

                        if(error) {
                            callback(error);

                        } else {
                            report.averageByQuarter = records;
                            callback();
                        }

                    });

            },
            function(callback) {
                report.salesByMonth = [];

                var threeMonthsAgo = moment().add(-6, 'M');
                msreader.executeQuery(
                    //DATENAME(month, GETDATE())
                    "SELECT YEAR(HeaderOrderDate) as SalesYear, MONTH(HeaderOrderDate) as SalesMonth, SUM(DetailExtendedPrice) as TotalSales " +
                    "FROM vw_CRMAllOrders WHERE HeaderOrderDate >= '" + threeMonthsAgo.format('L') +"' " + 
                    "GROUP BY YEAR(HeaderOrderDate), MONTH(HeaderOrderDate) " +
                    "ORDER BY YEAR(HeaderOrderDate) DESC, MONTH(HeaderOrderDate) DESC ",
                    function(error, records){

                        if(error) {
                            callback(error);

                        } else {
                            report.salesByMonth = records;
                            callback();
                        }

                    });

            },
            function(callback) {
                report.salesCountByQuarter = [];

                msreader.executeQuery(
                    "SELECT Year, QPivot.[1] As Q1, QPivot.[2] As Q2," +
                    "QPivot.[3] As Q3, QPivot.[4] As Q4 " +
                    "FROM (SELECT YEAR(HeaderOrderDate) [Year], " +
                    "DATEPART(QUARTER, HeaderOrderDate) [Quarter], " +
                    "COUNT(1) [DetailExtendedPrice Count] " +
                    "FROM vw_CRMAllOrders " +
                    "GROUP BY YEAR(HeaderOrderDate), " +
                    "DATEPART(QUARTER,HeaderOrderDate)) AS QuarterlyData " +
                    "PIVOT( SUM([DetailExtendedPrice Count])" +
                    "FOR QUARTER IN ([1],[2],[3],[4])) AS QPivot  ORDER BY Year DESC",
                    function(error, records){

                        if(error) {
                            callback(error);

                        } else {
                            report.salesCountByQuarter = records;
                            callback();
                        }

                    });

            },

        ],
        function(error){
            if (error){
                res.json(rbmJSONResponse.errorResponse(error));
            } else {
                res.json(rbmJSONResponse.successResponse(report));
            }
        }
    );

});

module.exports = router;
