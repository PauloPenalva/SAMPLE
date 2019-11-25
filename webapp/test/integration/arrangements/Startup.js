sap.ui.define([
	"sap/ui/test/Opa5"
], function(Opa5) {
	"use strict";

	return Opa5.extend("br.com.idxtec.Sample.test.integration.arrangements.Startup", {

		iStartMyApp: function () {
			this.iStartMyUIComponent({
				componentConfig: {
					name: "br.com.idxtec.Sample",
					async: true,
					manifest: true
				}
			});
		}

	});
});
