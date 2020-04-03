//@ts-nocheck
sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("br.com.idxtec.Sample.controller.Edit", {

        onInit: function () {
            var oViewModel = new JSONModel({
                busy : true,
                delay : 0
            });

            this.getRouter().getRoute("Edit").attachMatched(this._onObjectMatched, this);
            this.setModel(oViewModel, "objectView");
        },
    
        _onObjectMatched: function (oEvent) {
            let id = oEvent.getParameter("arguments").id;
            this._bindView("/Produtos(" + id + ")");
        },

        _bindView : function (sObjectPath) {
			var oViewModel = this.getModel("objectView");

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange : function () {
			var oView = this.getView(),
				oViewModel = this.getModel("objectView"),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}
            
			oView.getBindingContext().requestObject().then((function (oObject) {
				oViewModel.setProperty("/busy", false);
			}).bind(this));
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
