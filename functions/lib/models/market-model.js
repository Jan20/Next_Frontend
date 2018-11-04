"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Market {
    //////////////////
    // Constructors //
    //////////////////
    constructor(market_id, category, name) {
        this.market_id = market_id;
        this.category = category;
        this.name = name;
    }
    /////////////
    // Getters //
    /////////////
    getMarketId() {
        return this.market_id;
    }
    getCategory() {
        return this.category;
    }
    getName() {
        return this.name;
    }
    /////////////
    // Setters //
    /////////////
    setMarketId(marketId) {
        this.market_id = marketId;
    }
    setCategory(category) {
        this.category = category;
    }
    setName(name) {
        this.name = name;
    }
}
exports.Market = Market;
//# sourceMappingURL=market-model.js.map