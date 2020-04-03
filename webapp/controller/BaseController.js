//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/UIComponent"
], function (Controller, MessageBox, UIComponent){
    "use strict";

    return Controller.extend("BaseController", {

        getRouter: function() {
			return UIComponent.getRouterFor(this);
        },

        getModel : function (sName) {
			return this.getView().getModel(sName);
		},

		setModel : function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		getResourceBundle : function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },
        
        onNavBack: function () {
			let oHistory, sPreviousHash;

			oHistory = sap.ui.core.routing.History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("App", {}, true /*no history*/);
			}
        },

        messageBoxNoYes: function () {
            let sMessage = this.getResourceBundle().getText("BaseController.ExcluirItemSelecionado");
            let sTitle = this.getResourceBundle().getText("BaseController.Excluso")

            return new Promise( resolve => {
                MessageBox.show(
                    sMessage, {
                    "icon": MessageBox.Icon.QUESTION,
                    "title": sTitle,
                    "actions": [MessageBox.Action.NO, MessageBox.Action.YES],
                    "onClose": function (sAction) {
                        resolve(sAction)
                    }
                });
            });    
        }
  });

});
