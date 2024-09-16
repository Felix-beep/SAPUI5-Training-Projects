sap.ui.define([
    "sap/ui/calculator/app/Service/mockserver"
], function (mockserver) {
    "use strict";

    mockserver.init();

    // initialise the embedded component on the HTML page
    sap.ui.require(["sap/ui/core/ComponentSupport"]);
});