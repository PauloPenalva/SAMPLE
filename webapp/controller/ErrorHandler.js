//@ts-nocheck
sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (UI5Object, MessageBox, Filter, FilterOperator) {
    "use strict";

    return UI5Object.extend("ErrorHandler", {

        constructor: function (oController) {
            var oView = oController.getView();
            var oMessageManager = sap.ui.getCore().getMessageManager(),
                oMessageModel = oMessageManager.getMessageModel(),
                oMessageModelBinding = oMessageModel.bindList("/", undefined, [],
                    new Filter("technical", FilterOperator.EQ, true));

            oView.setModel(oMessageModel, "message");

            oMessageModelBinding.attachChange(this.onMessageBindingChange, oController);
            this._bTechnicalErrors = false;
        },


        onMessageBindingChange: function (oEvent) {
            var aContexts = oEvent.getSource().getContexts(),
                aMessages,
                bMessageOpen = false;

            if (bMessageOpen || !aContexts.length) {
                return;
            }

            // Extract and remove the technical messages
            aMessages = aContexts.map(function (oContext) {
                return oContext.getObject();
            });

            sap.ui.getCore().getMessageManager().removeMessages(aMessages);

            this._bTechnicalErrors = true;

            MessageBox.error(aMessages[0].message, {
                styleClass: !sap.ui.Device.support.touch ? "sapUiSizeCompact" : "sapUiSizeCozy",
                actions: [MessageBox.Action.CLOSE],
                onClose: function () {
                    bMessageOpen = false;
                }
            });

            bMessageOpen = true;
        }

    });

});
