/**
 * Created with JetBrains WebStorm.
 * User: richard
 * Date: 11/8/13
 * Time: 3:29 PM
 * To change this template use File | Settings | File Templates.
 */

/*
var mappings = [
    {source:"s1", target:"t1"},
    {source:"s2", target:"t2"},
    {target:"t3", expression:"source.s1.toUpperCase() + ' : ' + source.s2"}
]
*/

var objectMapper = function(mappings){
    this.mappings = mappings;

};


var isStandardMapping = function(mapping)
{
    if (typeof mapping.source == "undefined")
        return false;

    if (typeof mapping.target == "undefined")
        return false;

    if (typeof mapping.expression != "undefined")
        return false;

    return true;
};

var evaluate = function(expression, source){

    return eval(expression);

};

objectMapper.prototype.echoMappings = function(){
    return this.mappings;
};

objectMapper.prototype.map = function(source){

    var target = {};

    this.mappings.forEach(function(mapping){
        if(isStandardMapping(mapping)){
            target[mapping.target] =  source[mapping.source];

        } else {
            target[mapping.target] = evaluate(mapping.expression, source);

        }


    });

    return target;

};



module.exports = objectMapper;