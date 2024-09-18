sap.ui.define([
    "sap/ui/calculator/app/Controller/Navbar.controller"
], function (Navbar) {
    "use strict"

    return Navbar.extend("sap.ui.calculator.app.Controller.Login", {

        onInit: function() {
            this.byId("Loginpage");
        }
    });
});