sap.ui.define([
    "sap/ui/core/util/MockServer",
], function (MockServer) {
    "use strict";
    
    return {
        init: function() {
            var oMockServer = new MockServer({
                rootUri: "/"
            });

            oMockServer.simulate("../Service/metadata.xml", {
                sMockdataBaseUrl: "../Service/mockdata",
                bGenerateMissingMockData: true
            });

            oMockServer.start();

            console.log("Running with mock data");
        }
    };  
});