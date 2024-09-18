sap.ui.define([
    "sap/ui/model/json/JSONModel",
], function (JSONModel) {
    "use strict";

    var _owner;

    var _model = () => _owner.getModel();

    return {
        init: function (Owner) {
            _owner = Owner;
        },

        getOData: function (path) {

            console.log(_model().getData());

            if (path === null) return _model().getData();
            return _model().getData()[path];
        },

        getODataFromModel: function (path) {
            return new Promise((resolve, reject) => {
                _model().read(path, {
                    success: function (oData) {
                        resolve(oData.results);  // Resolve the promise with the new model
                    },
                    error: function (oError) {
                        reject(oError);  // Reject the promise with the error
                    }
                });
            });
        },

        appendToOData: function (oNewData) {
            var oCurrentData = _model().getData();

            var combined = {
                ...oCurrentData, 
                ...oNewData
            }

            var mNewJson = new JSONModel(combined);

            _owner.setModel(mNewJson);
        },

        wrapJson: function ( data, name ) {
            return {
                [name]: data
            };
        },

    };
});