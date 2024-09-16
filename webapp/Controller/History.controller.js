sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict"

    return Controller.extend("sap.ui.calculator.app.Controller.History", {
        
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
    });
});