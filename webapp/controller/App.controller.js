//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("br.com.idxtec.Sample.controller.App", {

        onInit: function () {
            const oView = this.getView();
            oView.addStyleClass(this.getOwnerComponent().getContentDensityClass());
        },

        refresh: function () {
            const oModel = this.getOwnerComponent().getModel();

            if (oModel.hasPendingChanges()) {
                oModel.resetChanges();
            }
            
            oModel.refresh();
        }

    });
});
