sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("br.com.idxtec.Sample.controller.NotFound", {

		onLinkPressed: function () {
            this.getRouter().navTo("RouteApp");
        }

    });

});
