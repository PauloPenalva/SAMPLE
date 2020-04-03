//@ts-nocheck
sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, MessageBox, Filter, FilterOperator) {
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
        },

        search: function (oEvent) {
            let sQuery = oEvent.getParameter("query");
            let oTable = this.byId("table");
            let aFilters = [];

            if (sQuery) {
                aFilters.push( new Filter("Descricao", FilterOperator.Contains, sQuery));
            }
            
            oTable.getBinding("rows").filter(aFilters);
        },

        add: function () {
            const oRouter = this.getRouter();
            oRouter.navTo("Add");
        },

        edit: function () {
            const oRouter = this.getRouter();
            const oTable = this.byId("table");
            const oContext = oTable.getContextByIndex(oTable.getSelectedIndex());

            if (oContext) {
                let sId = oContext.getProperty("Id");
                oRouter.navTo("Edit", {
                    id: sId
                });
            }

        },

        delete: async function (oEvent) {
            var oTable = this.byId("table");
            var oView = this.getView();
            var oContext = oTable.getContextByIndex(oTable.getSelectedIndex());

            if (oContext) {
                oView.setBusy(true);
                try {
                    if (await this.messageBoxNoYes() == "YES") {
                        await oContext.delete("$auto");
                        oTable.clearSelection();
                    }
                } catch (oError) {
                    MessageBox.error(oError.message)
                } finally {
                    oView.setBusy(false);
                }
            }
        }

    });

});
