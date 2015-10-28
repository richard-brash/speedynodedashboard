
module.exports = {
    mssql: {
        username:"rbrash",
        password:"brash",
        server: "173.10.33.141"
    },
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
        //{source:"Contact_Notes", target:"ContactNotes"},
        {source:"fax", target:"Fax1"},
        {source:"BranchLocation", target:"_BranchLocation"}
    ],
    conditions:{}
};