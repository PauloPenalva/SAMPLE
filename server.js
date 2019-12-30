/* eslint-disable strict */
//@ts-nocheck 

const express = require('express');
const proxy = require("http-proxy-middleware");
const open = require('open');

require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use("/", express.static("../"));
app.use('/webapp', express.static("webapp"));

let oConfig = {
    neoApp: require("./neo-app.json"),
    destinations: require("./destinations.json")
};

let oNeoApp = oConfig.neoApp,
    oDestinations = oConfig.destinations

if (oNeoApp && oNeoApp.routes) {
    oNeoApp.routes.forEach(oRoute => {
        var oTarget = oRoute.target;
        if (oTarget) {

            var oOptions = {};

            if (oDestinations && oTarget.name) {
                var oDestination = oDestinations[oTarget.name];
                if (oDestination) {
                    oOptions.target = oDestination.target;
                    oOptions.changeOrigin = true;
                    oOptions.secure = false;
                }
            }

            if (oRoute.path && oTarget.entryPath) {
                var oRouteNew = {};
                var sPathOld = "^" + oRoute.path;
                oRouteNew[sPathOld] = oTarget.entryPath;
                oOptions.pathRewrite = oRouteNew;
            }

            app.use(oRoute.path, proxy(oOptions));
        }
    });
}

app.listen(port, () => {
    console.log("\n\n*** IDX Consultoria e Sistemas ***");
    console.log("")
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log('Para derrubar o servidor: CTRL + C');
});

(async () => {
    await open(`http://localhost:${port}/webapp/`);
})();
