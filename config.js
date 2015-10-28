/**
 * Created by richardbrash on 10/21/15.
 */

function Config(){

    var self = this;

    self.infusionsoftConfigs = [
        {
            name:"Speedy",
            AppName:"es137",
            ApiKey:"f15800f9ecb7a80edbb6e5d62ec2e416",
            UserId:1,
            mssql: {
                username:"rbrash",
                password:"brash",
                server: "173.10.33.141"
            },
            tableMappings:[{
                tableName:"vw_CRMContact",
                mappings:[
                    {source:"customer_id", target:"_SpeedyId0"},
                    {source:"Company", target:"Company"},
                    {source:"Country", target:"Country"},
                    {source:"ContactFirstName", target:"FirstName"},
                    {source:"ContactLastName", target:"LastName"},
                    {source:"phone", target:"Phone1"},
                    {source:"city", target:"City"},
                    {source:"PostalCode", target:"PostalCode"},
                    {source:"state", target:"State"},
                    {source:"address", target:"StreetAddress1"},
                    {source:"address2", target:"StreetAddress2"},
                    {source:"email", target:"Email"},
                    {source:"fax", target:"Fax1"},
                    {source:"BranchLocation", target:"_BranchLocation"}
                ],
                conditions:{}
            },
                {
                    tableName: "vw_CRMAllOrders",
                    listmappings:[
                        {
                            "source": "HeaderOrder_ID",
                            "target": "HeaderOrder_ID"
                        },
                        {
                            "source": "HeaderCompanyName",
                            "target": "HeaderCompanyName"
                        },
                        {
                            "source": "HeaderCustomer_ID",
                            "target": "HeaderCustomer_ID"
                        },
                        {
                            "source": "CRMCompanyID",
                            "target": "CRMCompanyID"
                        },
                        {
                            "source": "CRMContactID",
                            "target": "CRMContactID"
                        },
                        {
                            "source": "HeaderOrderDate",
                            "target": "HeaderOrderDate"
                        },
                        {
                            "source": "HeaderContact",
                            "target": "HeaderContact"
                        },
                        {
                            "source": "HeaderOrderTotal",
                            "target": "HeaderOrderTotal"
                        },
                        {
                            "source": "HeaderQuoteNumber",
                            "target": "HeaderQuoteNumber"
                        },
                        {
                            "source": "HeaderCustomerPO",
                            "target": "HeaderCustomerPO"
                        },
                        {
                            "source": "HeaderPaymentMethod",
                            "target": "HeaderPaymentMethod"
                        },
                        {
                            "source": "QuoteSalesmanID",
                            "target": "QuoteSalesmanID"
                        },
                        {
                            "source": "OrderSalesmanID",
                            "target": "OrderSalesmanID"
                        },
                        {
                            "source": "ProcessSalesmanID",
                            "target": "ProcessSalesmanID"
                        },
                        {
                            "source": "ShipVia",
                            "target": "ShipVia"
                        }

                    ],
                    detailmappings:[
                        {
                            "source": "HeaderOrder_ID",
                            "target": "HeaderOrder_ID"
                        },
                        {
                            "source": "HeaderCompanyName",
                            "target": "HeaderCompanyName"
                        },
                        {
                            "source": "HeaderCustomer_ID",
                            "target": "HeaderCustomer_ID"
                        },
                        {
                            "source": "CRMCompanyID",
                            "target": "CRMCompanyID"
                        },
                        {
                            "source": "CRMContactID",
                            "target": "CRMContactID"
                        },
                        {
                            "source": "HeaderOrderDate",
                            "target": "HeaderOrderDate"
                        },
                        {
                            "source": "HeaderContact",
                            "target": "HeaderContact"
                        },
                        {
                            "source": "HeaderOrderTotal",
                            "target": "HeaderOrderTotal"
                        },
                        {
                            "source": "HeaderQuoteNumber",
                            "target": "HeaderQuoteNumber"
                        },
                        {
                            "source": "HeaderCustomerPO",
                            "target": "HeaderCustomerPO"
                        },
                        {
                            "source": "HeaderPaymentMethod",
                            "target": "HeaderPaymentMethod"
                        },
                        {
                            "source": "DetailItemCode",
                            "target": "DetailItemCode"
                        },
                        {
                            "source": "DetailInventoryCategory",
                            "target": "DetailInventoryCategory"
                        },
                        {
                            "source": "DetailItemDescription",
                            "target": "DetailItemDescription"
                        },
                        {
                            "source": "DetailInventoryDescription",
                            "target": "DetailInventoryDescription"
                        },
                        {
                            "source": "DetailPcs",
                            "target": "DetailPcs"
                        },
                        {
                            "source": "DetailLength",
                            "target": "DetailLength"
                        },
                        {
                            "source": "DetailQtyOrder",
                            "target": "DetailQtyOrder"
                        },
                        {
                            "source": "DetailExtendedPrice",
                            "target": "DetailExtendedPrice"
                        },
                        {
                            "source": "DetailItemCost",
                            "target": "DetailItemCost"
                        },
                        {
                            "source": "DetailMargin",
                            "target": "DetailMargin"
                        },
                        {
                            "source": "QuoteSalesmanID",
                            "target": "QuoteSalesmanID"
                        },
                        {
                            "source": "OrderSalesmanID",
                            "target": "OrderSalesmanID"
                        },
                        {
                            "source": "ProcessSalesmanID",
                            "target": "ProcessSalesmanID"
                        },
                        {
                            "source": "ShipVia",
                            "target": "ShipVia"
                        }
                    ],
                    conditionsForDetail:  function(value){
                        var retval = {
                            HeaderOrder_ID : { $eq : value }
                        };
                        return retval;
                    },
                    conditionsForList:  function(value){
                        var retval = {
                            HeaderCustomer_ID : { $eq : value }
                        };
                        return retval;
                    },
                    orderby:" ORDER BY HeaderOrder_ID  DESC"
                },
                {
                    tableName: "vw_CRMAllQuotes",
                    listmappings:[
                        {
                            "source": "HeaderQuote_ID",
                            "target": "HeaderQuote_ID"
                        },
                        {
                            "source": "HeaderCompanyName",
                            "target": "HeaderCompanyName"
                        },
                        {
                            "source": "HeaderCustomer_ID",
                            "target": "HeaderCustomer_ID"
                        },
                        {
                            "source": "CRMCompanyID",
                            "target": "CRMCompanyID"
                        },
                        {
                            "source": "CRMContactID",
                            "target": "CRMContactID"
                        },
                        {
                            "source": "HeaderOrderDate",
                            "target": "HeaderOrderDate"
                        },
                        {
                            "source": "HeaderContact",
                            "target": "HeaderContact"
                        },
                        {
                            "source": "HeaderPaymentMethod",
                            "target": "HeaderPaymentMethod"
                        },
                        {
                            "source": "SalesmanID",
                            "target": "SalesmanID"
                        },
                        {
                            "source": "ShipVia",
                            "target": "ShipVia"
                        }
                    ],
                    detailmappings:[
                        {
                            "source": "HeaderQuote_ID",
                            "target": "HeaderQuote_ID"
                        },
                        {
                            "source": "HeaderCompanyName",
                            "target": "HeaderCompanyName"
                        },
                        {
                            "source": "HeaderCustomer_ID",
                            "target": "HeaderCustomer_ID"
                        },
                        {
                            "source": "CRMCompanyID",
                            "target": "CRMCompanyID"
                        },
                        {
                            "source": "CRMContactID",
                            "target": "CRMContactID"
                        },
                        {
                            "source": "HeaderOrderDate",
                            "target": "HeaderOrderDate"
                        },
                        {
                            "source": "HeaderContact",
                            "target": "HeaderContact"
                        },
                        {
                            "source": "HeaderPaymentMethod",
                            "target": "HeaderPaymentMethod"
                        },
                        {
                            "source": "DetailItemCode",
                            "target": "DetailItemCode"
                        },
                        {
                            "source": "DetailInventoryCategory",
                            "target": "DetailInventoryCategory"
                        },
                        {
                            "source": "DetailItemDescription",
                            "target": "DetailItemDescription"
                        },
                        {
                            "source": "DetailInventoryDescription",
                            "target": "DetailInventoryDescription"
                        },
                        {
                            "source": "DetailPcs",
                            "target": "DetailPcs"
                        },
                        {
                            "source": "DetailLength",
                            "target": "DetailLength"
                        },
                        {
                            "source": "DetailQtyOrder",
                            "target": "DetailQtyOrder"
                        },
                        {
                            "source": "DetailExtendedPrice",
                            "target": "DetailExtendedPrice"
                        },
                        {
                            "source": "DetailItemCost",
                            "target": "DetailItemCost"
                        },
                        {
                            "source": "DetailMargin",
                            "target": "DetailMargin"
                        },
                        {
                            "source": "SalesmanID",
                            "target": "SalesmanID"
                        },
                        {
                            "source": "ShipVia",
                            "target": "ShipVia"
                        }
                    ],
                    conditionsForDetail:  function(value){
                        var retval = {
                            HeaderQuote_ID : { $eq : value }
                        };
                        return retval;
                    },
                    conditionsForList:  function(value){
                        var retval = {
                            HeaderCustomer_ID : { $eq : value }
                        };
                        return retval;
                    },
                    orderby:" ORDER BY HeaderQuote_ID  DESC"
                }

            ],
            CompanyModel:[
                'Id',
                'City',
                'Company',
                'Email',
                'Id',
                'Phone1',
                'Phone1Ext',
                'PostalCode',
                'State',
                'Country',
                'StreetAddress1',
                'StreetAddress2',
                'Website',
                '_Zone',
                '_BranchLocation',
                '_SpeedyId0']

        }



    ];

    self.getTableMappingForTable = function(tablename, config){
        var mappings = null;

        for(var key in config.tableMappings){
            if(config.tableMappings[key].tableName == tablename){
                mappings = config.tableMappings[key];
            }
        }

        return mappings;

    }

    self.ISConfig = function(appName){
        var config = null;

        for(var key in self.infusionsoftConfigs){
            if(self.infusionsoftConfigs[key].AppName == appName){
                config = self.infusionsoftConfigs[key];
            }
        }

        return config;
    }


}

module.exports = new Config();