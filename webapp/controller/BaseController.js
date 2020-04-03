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

		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle : function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },
        
        onNavBack: function () {
			var oHistory, sPreviousHash;

			oHistory = sap.ui.core.routing.History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("RouteApp", {}, true /*no history*/);
			}
        },


        messageBoxNoYes: function () {
            
            return new Promise( resolve => {
                MessageBox.show(
                    "Excluir item selecionado ?", {
                    "icon": MessageBox.Icon.QUESTION,
                    "title": "Exclusão",
                    "actions": [MessageBox.Action.NO, MessageBox.Action.YES],
                    "onClose": function (sAction) {
                        resolve(sAction)
                    }
            
                });
            
            });    
        
        }

       
    });

});
