//@ts-nocheck
sap.ui.define([
    "./BaseController",
    "./ErrorHandler",
    "sap/m/MessageBox"
], function (Controller, ErrorHandler, MessageBox) {
    "use strict";

    return Controller.extend("br.com.idxtec.Sample.controller.Edit", {

        onInit: function () {
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
            var oRouter = this.getRouter();
            
            oRouter.getRoute("Edit").attachMatched(this.routerMatch, this);
            this._oErrorHandler = new ErrorHandler(this);
        },
    
    
        onExit: function(){
          this._oErrorHandler.destroy();
        },

        /**
         * @private
         * @param {sap.ui.core.EventBus} oEvent Router Event
         */
        routerMatch: function (oEvent) {
            const oView = this.getView();
            const id = oEvent.getParameter("arguments").id;
            oView.bindElement("/Produtos(" + id + ")"); 
        },

        save: async function () {
            var oModel = this.getModel();
            var oView = this.getView();

            oView.setBusy(true);

            try {
                await oModel.submitBatch("updGroup");
                if ( !oModel.hasPendingChanges() ) {
                    MessageBox.success("Dados Gravados !",{
                        onClose: function() {
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

        cancel: function() {
            if (this.getModel().hasPendingChanges()){
                this.getModel().resetChanges();
            }
            
            this.onNavBack();
        }

    });

});
