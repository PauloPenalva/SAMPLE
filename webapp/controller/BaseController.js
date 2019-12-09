//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox){
    "use strict";

    return Controller.extend("BaseController", {

        getModel: function(sModel){
			return this.getOwnerComponent().getModel(sModel);
		},
		
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
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
