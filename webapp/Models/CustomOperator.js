sap.ui.define([
	"sap/ui/model/SimpleType",
	"sap/ui/model/ValidateException",
], function (SimpleType, ValidateException) {
    "use strict";

    ValidOperators = [ "+", "-", "*", "/", ":", "P", "M", "%"];

    return SimpleType.extend("type.CustomOperator", {

        formatValue: function (oValue) {
            return oValue;
        },
    
        parseValue: function (oValue) {
            //parsing step takes place before validating step, value could be altered here
            return oValue;
        },
    
        validateValue: function (oValue) {
            if(!ValidOperators.includes(oValue)){
                throw new ValidateException("'" + oValue + "' is not a valid operator.");
            }
        }
    })
});

