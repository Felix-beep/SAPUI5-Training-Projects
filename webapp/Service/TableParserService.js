sap.ui.define([
    "sap/ui/model/json/JSONModel",
], function () {
    "use strict";

    const keyMapping = {
        Guid: 'ID',
        ZInput1: 'Input1',
        ZOperator: 'Operator',
        ZInput2: 'Input2',
        ZResult: 'Result'
    };

    return {

        parseData: function (oData) {
            return oData.map(item => {
                let parsedItem = {};
                for (const [sourceKey, targetKey] of Object.entries(keyMapping)) {
                    parsedItem[targetKey] = item[sourceKey];
                }
                return parsedItem;
            });
        },

    };
});