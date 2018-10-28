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
const market_model_1 = require("./market-model");
class MarketService {
    //////////////////
    // Constructors //
    //////////////////
    constructor() { }
    ///////////////
    // Functions //
    ///////////////
    /**
     *
     *
     *
     */
    static getInstance() {
        this.instance === undefined ? this.instance = new MarketService() : null;
        return this.instance;
    }
    /**
     *
     *
     *
     */
    getMarkets() {
        return __awaiter(this, void 0, void 0, function* () {
            const markets = [];
            yield database_service_1.DatabaseService.getInstance().getFirestore().collection(`/markets`).get().then(newMarkets => {
                newMarkets.forEach(market => console.log(market.data()));
                newMarkets.forEach(market => markets.push(new market_model_1.Market(market.data().market_id, market.data().category, market.data().name)));
            });
            return new Promise(resolve => resolve(markets));
        });
    }
}
exports.MarketService = MarketService;
//# sourceMappingURL=market-service.js.map