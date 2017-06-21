define(['account/account'], function (account) {

    var TopCompany = function (data) {

        var self = this;
        //COMPANY {{ % DIFF for 3 month rolling }} {{[2016 TOTAL]}} {{[JAN-MAY 2017] [JAN-MAY 2016]}} 	{{[MAR, APR, MAY 2017]}} 	{{2016/4}}

        // console.log(data);
        self.Speedy_Id = ko.observable(data.Speedy_Id);
        self.Company = ko.observable(data.Company);
        self.YearDiff = ko.observable();
        self.QuarterDiff = ko.observable();
        self.LastYearTotal = ko.observable(data.LastYear);
        self.ThisYTD = ko.observable();
        self.LastYTD = ko.observable();
        self.ThisR3M = ko.observable();
        self.LastQAVG = ko.observable();

        self.init = function () {

            // console.log(ko.toJS(self));
            var payload = {
                url: "report/sales/" + self.Speedy_Id(),
                method: "GET",
                data: {},
                success: function (response) {

                    if (response.success) {
                        var report = response.data;

                        // console.log(report);    

                        // if (self.Company() == ""){
                        //     console.log(report);

                        // }
                        
                        self.ThisYTD(report.CurrentYearOrdersTotal);
                        self.LastYTD(report.LastYearOrdersTotal);

                        var r3mMax = (report.salesByMonth.length >= 4) ? 4 : report.salesByMonth.length;
                        var r3Val = 0;
                        for(var r3 = 1; r3 < r3mMax; r3++){
                            r3Val += report.salesByMonth[r3].TotalSales;
                        }

                        //self.ThisR3M(parseFloat(report.salesByMonth[1].TotalSales) + parseFloat(report.salesByMonth[2].TotalSales) + parseFloat(report.salesByMonth[3].TotalSales));
                        self.ThisR3M(r3Val);

                        self.LastQAVG(parseFloat(report.salesTotalByYears[1].Total) / 4)

                        self.YearDiff((parseFloat(self.ThisYTD()) - parseFloat(self.LastYTD()))  / parseFloat(self.LastYTD()) * 100);
                        self.QuarterDiff((parseFloat(self.ThisR3M()) - parseFloat(self.LastQAVG()) ) / parseFloat(self.LastQAVG()) * 100);


                    } else {
                        console.log(response);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            }

            account.ajax(payload);


            // self.Diff(4);
            
            // self.LastYTD(3000);
            // self.ThisR3M(4000);
            // self.LastQAVG(5000);
        }

    }

    return TopCompany;


});
