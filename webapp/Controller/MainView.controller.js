ValidOperators = [ "+", "-", "*", "/", ":", "P", "M", "%"];

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/ui/model/SimpleType",
	"sap/ui/model/ValidateException",
	"sap/ui/core/Messaging",
	"sap/ui/core/routing/History"
], function (Controller, MessageToast, SimpleType, ValidateException, Messaging, History) {
    "use strict"

    return Controller.extend("sap.ui.calculator.app.Controller.MainView", {

        onInit: function () {
			var oView = this.getView(), oMM = Messaging;

			oMM.registerObject(oView.byId("Operator"), true);
        },        

        calculateResult: function () {

            var isValid = this._manualValidate();

            if(!isValid){
                console.log("Validation Error");
                return;
            }

            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            var Calculation = this.getView().getModel().getProperty("/calculation")

            console.log(Calculation);

            var sMsg = oBundle.getText("calculatingMessage", [Calculation.Input1, Calculation.Operator, Calculation.Input2]);
            MessageToast.show(sMsg);
        },

        _manualValidate: function () {
            var Calculation = this.getView().getModel().getProperty("/calculation");
            
            if(Calculation.Input1.length < 1) return false;
            if(Calculation.Input1.length < 1) return false;
            if(!ValidOperators.includes(Calculation.Operator)) return false;

            return true;
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

        onNavBack: function () {
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();


			if (sPreviousHash !== undefined) {
				window.history.go(-1);
                console.log("Navigating to last screen");
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("mainView");
                console.log("Navigating to home screen");
			}
		},

        onLoginButtonClick: function (oValue) {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("loginscreen");
        },

        navigateToHistory: function (oValue) {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("fullhistory");
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
    });
});