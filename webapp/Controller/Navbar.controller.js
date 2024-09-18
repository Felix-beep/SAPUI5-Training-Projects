sap.ui.define([
	"sap/ui/core/routing/History",
    "sap/ui/core/mvc/Controller",
], function (History, Controller) {
    "use strict"
    
    return Controller.extend("sap.ui.calculator.app.Controller.Navbar", {
        onNavBack: function () {
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
                var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("mainView");
			}
		},

        onLoginButtonClick: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("loginscreen");
        },
    })
});