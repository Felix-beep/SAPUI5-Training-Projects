ValidOperators = [ "+", "-", "*", "/", ":", "P", "M", "%"];

sap.ui.define([
    "sap/m/MessageToast",
	"sap/ui/core/Messaging",
    "sap/ui/calculator/app/Controller/Navbar.controller",
    "sap/ui/calculator/app/Models/CustomOperator"
], function (MessageToast, Messaging, Navbar, CustomOperator) {
    "use strict"

    return Navbar.extend("sap.ui.calculator.app.Controller.MainView", {

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

            var Calculation = this.getView().getModel("calculationExample").getData();

            console.log(Calculation);

            var sMsg = oBundle.getText("calculatingMessage", [Calculation.Input1, Calculation.Operator, Calculation.Input2]);
            MessageToast.show(sMsg);
        },

        _manualValidate: function () {
            var Calculation = this.getView().getModel("calculationExample").getData();


            if(Calculation.Input1.length < 1) return false;
            if(Calculation.Input2.length < 1) return false;
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

        navigateToHistory: function (oValue) {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("fullhistory");
        },
    });
});