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
const database_service_1 = require("../database/database-service");
const asset_model_1 = require("./asset-model");
class AssetService {
    //////////////////
    // Constructors //
    //////////////////
    constructor() { }
    ///////////////
    // Functions //
    ///////////////
    static getInstance() {
        this.instance === undefined ? this.instance = new AssetService() : null;
        return this.instance;
    }
    /**
     *
     * Returns a specific asset from a given market and a given symbol
     *
     * @param market
     * @param symbol
     */
    getAsset(market, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnAsset;
            yield database_service_1.DatabaseService.getInstance().getFirestore().doc(`/markets/${market}/assets/${symbol}`).get().then(asset => {
                returnAsset = new asset_model_1.Asset(asset.data().symbol, asset.data().name, asset.data().market_id);
            });
            return new Promise(resolve => resolve(returnAsset));
        });
    }
    /**
     *
     * Returns all assets of a given market
     *
     * @param market
     */
    getAssets(market) {
        return __awaiter(this, void 0, void 0, function* () {
            const assets = [];
            yield database_service_1.DatabaseService.getInstance().getFirestore().collection(`/markets/${market}/assets`).get().then(newStocks => {
                newStocks.forEach(stock => assets.push(new asset_model_1.Asset(stock.data().symbol, stock.data().name, stock.data().market_id)));
            });
            return new Promise(resolve => resolve(assets));
        });
    }
}
exports.AssetService = AssetService;
//# sourceMappingURL=asset-service.js.map