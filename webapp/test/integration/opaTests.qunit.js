/* global QUnit */
//@ts-nocheck
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"br/com/idxtec/Sample/test/integration/AllJourneys"
	], function() {
		QUnit.start();
	});
});
