"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Asset {
    //////////////////
    // Constructors //
    //////////////////
    constructor(symbol, name, market_id) {
        this.symbol = symbol;
        this.name = name;
        this.market_id = market_id;
    }
    /////////////
    // Getters //
    /////////////
    getSymbol() {
        return this.symbol;
    }
    getName() {
        return this.name;
    }
    getMarketId() {
        return this.market_id;
    }
    /////////////
    // Setters //
    /////////////
    setSymbol(symbol) {
        this.symbol = symbol;
    }
    setName(name) {
        this.name = name;
    }
    setMarketId(marketId) {
        this.market_id = marketId;
    }
}
exports.Asset = Asset;
//# sourceMappingURL=asset-model.js.map