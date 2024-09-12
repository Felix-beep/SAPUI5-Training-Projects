sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "sap.ui.calculator.app",
		settings : {
			id: "calculator"
		},
		async: true
	}).placeAt("content");

});