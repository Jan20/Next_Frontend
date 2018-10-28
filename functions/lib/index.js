"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const market_service_1 = require("./market/market-service");
const asset_service_1 = require("./asset/asset-service");
const update_service_1 = require("./update/update-service");
const router = express();
const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.get('/markets/:marketId', asyncMiddleware((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    asset_service_1.AssetService.getInstance().getAssets(req.params['marketId']).catch(error => console.log(error)).then(response => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response));
    }).catch(error => console.log(error));
})));
router.get('/markets', asyncMiddleware((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    market_service_1.MarketService.getInstance().getMarkets().catch(error => console.log(error)).then(response => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response));
    }).catch(error => console.log(error));
})));
router.get('/updateMarketData', asyncMiddleware((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    new update_service_1.UpdateService().updateMarketData().then(result => {
        if (result) {
            res.setHeader('Content-Type', 'text/html');
            res.send('All assets are up-to-date.');
        }
        else {
            res.setHeader('Content-Type', 'text/html');
            res.send('There are still some unupdated assets');
        }
    });
})));
exports.api = functions.https.onRequest((req, res) => {
    !req.path ? req.url = `/${req.url}` : null;
    return router(req, res);
});
//# sourceMappingURL=index.js.map