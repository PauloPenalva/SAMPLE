//@ts-nocheck
sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("br.com.idxtec.Sample.controller.Add", {

        onInit: function () {
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
            var oRouter = this.getRouter();

            oRouter.getRoute("Add").attachMatched(this._routerMatch, this);
        },

        _routerMatch: function () {
            const oView = this.getView();
            const oModel = this.getModel();
            const oBinding = oModel.bindList("/Produtos");
            const oContext = oBinding.create();

            oView.setBindingContext(oContext);
        },

        save: async function () {
            var oModel = this.getModel();
            var oView = this.getView();

            oView.setBusy(true);

            try {
                await oModel.submitBatch("updGroup");
                if (!oModel.hasPendingChanges()) {
                    MessageBox.success("Dados Gravados !", {
                        onClose: function () {
                            oModel.refresh();
                            this.onNavBack();
                        }.bind(this)
                    });
                }
            } catch (oError) {
                MessageBox.error(oError.message);
            } finally {
                oView.setBusy(false)
            }
        },

        cancel: function () {
            if (this.getModel().hasPendingChanges()) {
                this.getModel().resetChanges();
            }

            this.onNavBack();
        }

    });

});
