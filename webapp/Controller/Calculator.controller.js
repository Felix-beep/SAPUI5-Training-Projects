ValidOperators = [ "+", "-", "*", "/", ":", "P", "M", "%"];

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/ui/model/SimpleType",
	"sap/ui/model/ValidateException",
	"sap/ui/core/Messaging",
], function (Controller, MessageToast, SimpleType, ValidateException, Messaging ) {
    'use strict';
    return Controller.extend("sap.ui.calculator.app.Controller.Calculator", {

        onInit: function () {
			var oView = this.getView(), oMM = Messaging;

			oMM.registerObject(oView.byId("Operator"), true);
		},

        calculateResult: function () {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            var Calculation = this.getView().getModel().getProperty("/calculation")

            console.log(Calculation);

            var sMsg = oBundle.getText("calculatingMessage", [Calculation.Input1, Calculation.Operator, Calculation.Input2]);
            MessageToast.show(sMsg);
        },

        _validateInput: function (oInput) {
			var sValueState = "None";
			var bValidationError = false;
			var oBinding = oInput.getBinding("value");

			try {
				oBinding.getType().validateValue(oInput.getValue());
			} catch (oException) {
				sValueState = "Error";
				bValidationError = true;
			}

			oInput.setValueState(sValueState);

			return bValidationError;
		},

        // move this to its own model

        

        customOperatorType: SimpleType.extend("Text", {

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
    })
});

