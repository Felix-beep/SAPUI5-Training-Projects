sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/calculator/app/Service/oDataService"
], function (UIComponent, oDataService) {
    "use strict";
    return UIComponent.extend("sap.ui.calculator.app.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            this.initOdata();

            // create the views based on the url/hash
            this.getRouter().initialize();
        },

        initOdata: function () {

            oDataService.init(this);

            oDataService.getODataFromModel("/RestableentrySet")
                .then(function(oData) {
                    console.log("Restable Data fetched successfully");
                    oData = oDataService.wrapJson(oData, "calculations");
                    oDataService.appendToOData(oData);
                })
                .catch(function(oError) {
                    console.error("Failed to fetch model: ", oError);
                });
            
            oDataService.appendToOData(
            {
                calculationEx: {
                    Input1: "1",
                    Operator: "+",
                    Input2: "2",
                    validOperation: true
                }
            });
        }

    });
});