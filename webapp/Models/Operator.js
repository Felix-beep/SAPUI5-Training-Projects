ValidOperators = [ "+", "-", "*", "/", ":", "P", "M", "%"];

customOperatorType: SimpleType.extend("operator", {

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
});